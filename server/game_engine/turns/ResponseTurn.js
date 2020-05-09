const AbstractTurn = require('./AbstractTurn');

class ResponseTurn extends AbstractTurn {
    constructor(player, action, avail){
        super(player);
        this.lastAction = action;
        this.availableActions = avail;
    }
}

module.exports = ResponseTurn;