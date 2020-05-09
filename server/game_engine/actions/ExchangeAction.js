const AbstractAction = require('./AbstractAction');
const ActionTurn = require('../turns/ActionTurn');
const ExchangeTurn = require('../turns/ExchangeTurn');
const ResponseTurn = require('../turns/ResponseTurn');
const CARDTYPES = require('../cardtypes');

class ExchangeAction extends AbstractAction {
    constructor(player){
        super(player);
        this.canChallenge = true;
        this.character = CARDTYPES.AMBASSADOR;
        this.timeout;
        this.message = `${this.player.name} is going to exchange!`;
    }

    succeed(){
        this.player.drawCards(2);
        this.canChallenge = false;
        this.message = `${this.player.name} is exchanging!`;
        this.player.game.nextTurn(new ExchangeTurn(this.player, this));
    }

    fail(){
        this.message = "";
        this.stopTimeout();
        this.player.game.nextTurn(new ActionTurn(this.player.game.nextPlayer(), this));
    }

    execute(){
        this.startTimeout();
        this.player.game.nextTurn(new ResponseTurn(this.player, this, []));
    }

    challenge(){
        this.stopTimeout();
        this.canChallenge = false;
        let card = this.player.findCardInstanceByValue(this.character);

        if(card){
            this.succeed();
            return false;
        }
        return true;
    }

    startTimeout(){
        let self = this;
        this.timeout = setTimeout(function(){
            self.succeed();
        }, 4000);
    }

    stopTimeout(){
        clearTimeout(this.timeout);
    }
}

module.exports = ExchangeAction;