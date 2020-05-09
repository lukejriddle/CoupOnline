const AbstractAction = require('./AbstractAction');
const CARDTYPES = require('../cardtypes');

class BlockAssassinationAction extends AbstractAction {
    constructor(player){
        super(player);
        this.canChallenge = true;
        this.character = CARDTYPES.CONTESSA;
        this.responseTo = player.game.turn.lastAction;
        this.message = `${this.player.name} blocked ${this.responseTo.player.name}'s assassination!`;
    }

    succeed(){
        this.responseTo.fail();
    }

    fail(){
        this.responseTo.succeed();
        this.message = this.responseTo.message;
    }
}

module.exports = BlockAssassinationAction;