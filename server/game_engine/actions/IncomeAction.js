const AbstractAction = require('./AbstractAction');

class IncomeAction extends AbstractAction{
    constructor(player){
        super(player);
        this.canChallenge = false;
        this.message = `${this.player.name} took income!`;
    }

    succeed(){
        this.player.drawCoins(1);
    }
}

module.exports = IncomeAction;