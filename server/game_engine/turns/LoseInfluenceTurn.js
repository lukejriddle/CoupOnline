const AbstractTurn = require('./AbstractTurn');

class LoseInfluenceTurn extends AbstractTurn {
    constructor(player, lastAction){
        super(player);
        this.availableActions = [-1];
        this.lastAction = lastAction;
        this.lastAction.secondMessage = `${player.name} is losing a card...`
    }
}

module.exports = LoseInfluenceTurn;