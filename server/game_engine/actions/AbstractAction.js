const ActionTurn = require('../turns/ActionTurn');

class AbstractAction {
    constructor(player){
        if(this.constructor === AbstractAction){
            throw new TypeError('Abstract constructor called.');
        }
        this.player = player;
    }

    succeed(){
        throw new TypeError('Abstract method called.');
    }

    fail(){
        throw new TypeError('Abstract method called.');
    }

    challenge(){
        if(this.canChallenge){
            this.canChallenge = false;
            let card = this.player.findCardInstanceByValue(this.character);

            return (!card ? true : false);
        } else {
            console.log('[EXCEPTION] Unchallengeable action was challenged.');
        }
    }

    execute(){
        let nextPlayer = this.player.game.nextPlayer();
        this.player.game.nextTurn(new ActionTurn(nextPlayer, this));

        this.succeed();
    }
}

module.exports = AbstractAction;