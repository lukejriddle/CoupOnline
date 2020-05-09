const AbstractTurn = require('./AbstractTurn');

class ActionTurn extends AbstractTurn {
    constructor(player, action){
        super(player);
        this.lastAction = action;
        this.availableActions = this._getAvailableActions();
    }

    _getAvailableActions(){
        if(this.activePlayer.coins >= 10) return [4];
        let res = [1, 2, 3, 6, 7];
        if(this.activePlayer.coins >= 3) res.push(5);
        if(this.activePlayer.coins >= 7) res.push(4);
        if(this.lastAction.additionalResponses) res.push(this.lastAction.additionalResponses);
        return res;
    }
}

module.exports = ActionTurn;