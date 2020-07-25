const AbstractAction = require('./AbstractAction');
const ActionTurn = require('../turns/ActionTurn');
const ResponseTurn = require('../turns/ResponseTurn');
const CARDTYPES = require('../cardtypes');

class StealAction extends AbstractAction {
    constructor(player, target){
        super(player);
        this.canChallenge = true;
        this.character = CARDTYPES.CAPTAIN;
        this.target = target;
        this.message = `${this.player.name} is stealing from ${this.target.name}!`
    }

    succeed(){
        this.message = `${this.player.name} stole from ${this.target.name}!`;
        let stolen = this.target.loseCoins(2);
        this.player.addCoins(stolen);
    }

    fail(){
        console.log('can Challenge is ' + this.canChallenge);
        if(!this.canChallenge){
            this.message = "";
            let nextPlayer = this.player.game.nextPlayer();
            console.log('im here');
            this.player.game.nextTurn(new ActionTurn(nextPlayer, this));
        }
    }

    execute(){
        this.player.game.nextTurn(new ResponseTurn(this.target, this, [9, 11]));
    }
}

module.exports = StealAction;