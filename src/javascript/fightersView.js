import View from './view';
import FighterView from './fighterView';
import { fighterService } from './services/fightersService';
import FighterDetailsView from './fighterDetailsView';
import Fighter from './fighter';

class FightersView extends View {
  constructor(fighters) {
    super();
    
    this.handleClick = this.handleFighterClick.bind(this);
    this.createFighters(fighters);
    this.createFightButton();
  }

  fightersDetailsMap = new Map();

  selectedFighters = new Map();

  createFighters(fighters) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleClick);
      return fighterView.element;
    });

    this.element = this.createElement({ tagName: 'div', className: 'fighters' });
    this.element.append(...fighterElements);
  }

  async handleFighterClick(event, fighter) {
    const id = fighter._id;
    const fighterElement = event.target.closest('.fighter');
    const fighterDetails = await this.getFighterDetails(id);
    const detailsView = new FighterDetailsView(fighterDetails);

    if (this.selectedFighters.has(id)) {
      return;
    }

    // reset if selected more than 2
    if (this.selectedFighters.size >= 2) {
      this.selectedFighters.clear();
      document.querySelectorAll('.fighter').forEach((item) => {
        item.classList.remove('selected');
      });

      document.querySelectorAll('.fighter-details').forEach((item) => {
        item.parentNode.removeChild(item); 
      });
    }

    // mark selected item
    this.selectedFighters.set(id, fighterDetails);
    fighterElement.classList.add('selected');

    fighterElement.append(detailsView.element);
  }

  async getFighterDetails(id) {
    let details = this.fightersDetailsMap.get(id);
    if (!details) {
      details = await fighterService.getFighterDetails(id);
      this.fightersDetailsMap.set(id, details);
    }

    return details;
  }
  
  createFightButton() {
    const buttonElement = this.createElement ({ tagName: 'button', className: 'fight-button' });
    buttonElement.innerText = 'Fight';
    buttonElement.addEventListener('click', event => this.handleFightClick(event), false);
    this.element.append(buttonElement);
  }
  
  handleFightClick(event) {
    if (this.selectedFighters.size < 2) {
      alert('Please, select fighters!')
      return 
    }
    const fighters = Array.from(this.selectedFighters.values());
    const fighter1 = new Fighter(fighters[0]);
    const fighter2 = new Fighter(fighters[1]);
    this.fight(fighter1, fighter2);
  }
  
  fight(fighter1, fighter2) {
    while (fighter1.health > 0 && fighter2.health > 0) {
      const fighter1Hit = fighter1.getHitPower() - fighter2.getBlockPower();
      const fighter2Hit = fighter2.getHitPower() - fighter1.getBlockPower();
      // console.log(`HITS: Fighter1: ${fighter1Hit}  Fighter2 ${fighter2Hit}`);

      fighter1.health = fighter1.health - fighter2Hit;
      fighter2.health = fighter2.health - fighter1Hit;
    }

    // console.log('Fight finished!');

    if (fighter1.health <= 0) {
      alert(`Fighter ${fighter2.name} wins!`);
    } else {
      alert(`Fighter ${fighter1.name} wins!`);
    }
  }
}

export default FightersView;