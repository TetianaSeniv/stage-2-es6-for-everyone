import View from './view';
import FighterView from './fighterView';
import { fighterService } from './services/fightersService';
import FighterDetailsView from './fighterDetailsView';

class FightersView extends View {
  constructor(fighters) {
    super();
    
    this.handleClick = this.handleFighterClick.bind(this);
    this.createFighters(fighters);
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
}

export default FightersView;