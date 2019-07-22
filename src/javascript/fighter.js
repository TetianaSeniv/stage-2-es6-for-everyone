class  Fighter {
    constructor(details) {
        this.name = details.name;
        this.attack = details.attack;
        this.health = details.health;
        this.defense = details.defense;
    }

    getHitPower() {
        const criticalHitChance = Math.floor(Math.random() * 2) + 1;
        return this.attack * criticalHitChance;
    }

    getBlockPower(){
        const dodgeChance = Math.floor(Math.random() * 2) + 1;
        return this.defense * dodgeChance;
    }
}

export default Fighter;
