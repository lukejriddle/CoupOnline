const AbstractAction = require('./AbstractAction');

class ForeignAidAction extends AbstractAction {
    constructor(player){
        super(player);
        this.canChallenge = false;
        this.requiresResponse = false;
        this.additionalResponses = 10;
        this.message = `${this.player.name} took foreign aid!`;
    }

    succeed(){
        this.player.drawCoins(2);
    }

    fail(){
        this.player.returnCoinsToDeck(2);
    }
}

module.exports = ForeignAidAction;