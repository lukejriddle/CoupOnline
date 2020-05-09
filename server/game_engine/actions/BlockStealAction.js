const AbstractAction = require('./AbstractAction');
const CARDTYPES = require('../cardtypes');

class BlockStealAction extends AbstractAction {
    constructor(player, card){
        super(player);
        this.canChallenge = true;
        this.character = card;
        this.responseTo = player.game.turn.lastAction;
        this.message = `${this.player.name} blocked ${this.responseTo.player.name}'s steal with their ` + this._getCardtype() + `!`;
    }

    succeed(){
        this.responseTo.fail();
    }

    fail(){
        this.responseTo.succeed();
        this.message = this.responseTo.message;
    }

    _getCardtype(){
        return Object.keys(CARDTYPES).find(key => CARDTYPES[key] == this.character).toLowerCase();
    }
}

module.exports = BlockStealAction;