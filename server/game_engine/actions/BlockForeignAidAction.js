const AbstractAction = require('./AbstractAction');
const ActionTurn = require('../turns/ActionTurn');
const CARDTYPES = require('../cardtypes');

class BlockForeignAidAction extends AbstractAction {
    constructor(player){
        super(player);
        this.canChallenge = true;
        this.character = CARDTYPES.DUKE;
        this.responseTo = player.game.turn.lastAction;
        this.message = `${this.player.name} blocked ${this.responseTo.player.name}'s foreign aid!`;
    }

    succeed(){
        this.responseTo.fail();
    }

    fail(){
        this.responseTo.succeed();
        this.message = this.responseTo.message;
    }

    execute(){
        this.succeed();
        this.player.game.nextTurn(new ActionTurn(this.player.game.turn.activePlayer, this));
    }
}

module.exports = BlockForeignAidAction;