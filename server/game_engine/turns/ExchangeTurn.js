const AbstractTurn = require('./AbstractTurn');

class ExchangeTurn extends AbstractTurn {
    constructor(player, action){
        super(player);
        this.lastAction = action;
        this.availableActions = [-2];
    }
}

module.exports = ExchangeTurn;