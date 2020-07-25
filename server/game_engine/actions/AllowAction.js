const AbstractAction = require('./AbstractAction');
const ActionTurn = require('../turns/ActionTurn');

class AllowAction extends AbstractAction{
    constructor(player){
        super(player);
        this.canChallenge = false;
        this.responseTo = player.game.turn.lastAction;
    }

    succeed(){
        this.responseTo.succeed();
        this.message = this.responseTo.message;
    }

    execute(){
        let nextPlayer = this.player.game.nextPlayer();
        this.player.game.nextTurn(new ActionTurn(nextPlayer, this));
        this.succeed();
    }
}

module.exports = AllowAction;