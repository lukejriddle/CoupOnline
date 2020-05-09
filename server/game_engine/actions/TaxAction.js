const AbstractAction = require('./AbstractAction');
const CARDTYPES = require('../cardtypes');

class TaxAction extends AbstractAction {
    constructor(player){
        super(player);
        this.canChallenge = true;
        this.character = CARDTYPES.DUKE;
    }

    succeed(){
        this.message = `${this.player.name} took tax!`;
        this.player.drawCoins(3);
    }

    fail(){
        this.message = "";
        this.player.returnCoinsToDeck(3);
    }
}

module.exports = TaxAction;