import View from './view';

class FighterDetailsView extends View {
  constructor(fighterDetails) {
    super();
    this.createFighterDetails(fighterDetails);
  }
  
  createFighterDetails(details) {
    this.element = this.createElement({ tagName: 'div', className: 'fighter-details' });
    
    const { attack, defense, health } = details;
    const strengthRow = this.createDataRow('Attack: ', attack);
    const defenseRow = this.createDataRow('Defense: ', defense);
    const healthRow = this.createDataRow('Health: ', health);

    this.element.append(strengthRow, defenseRow, healthRow);
  }

  createDataRow(key, value) {
    const element = this.createElement({ tagName: 'div', className: 'data-row' });
    element.innerText = `${key} ${value}`;

    return element;
  }
}

export default FighterDetailsView;