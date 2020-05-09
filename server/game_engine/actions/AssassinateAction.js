const AbstractAction = require('./AbstractAction');
const ResponseTurn = require('../turns/ResponseTurn');
const CARDTYPES = require('../cardtypes');

class AssassinateAction extends AbstractAction {
    constructor(player, target){
        super(player);
        this.canChallenge = true;
        this.character = CARDTYPES.ASSASSIN;
        this.target = target;
        this.message = `${this.player.name} is assassinating ${this.target.name}!`;
    }

    succeed(){
        this.message = `${this.player.name} assassinated ${this.target.name}!`;
        this.player.game.playerLoseInfluence(this.target);
    }

    fail(){
        this.message = "";
        if(!this.canChallenge){
            this.player.drawCoins(3);
        }
    }

    execute(){
        this.player.returnCoinsToDeck(3);
        this.player.game.nextTurn(new ResponseTurn(this.target, this, [8, 11]))
    }
}

module.exports = AssassinateAction;