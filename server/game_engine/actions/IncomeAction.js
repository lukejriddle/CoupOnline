const AbstractAction = require('./AbstractAction');

class IncomeAction extends AbstractAction{
    constructor(player){
        super(player);
        this.value = 1;
        this.canChallenge = false;
        this.requiresResponse = false;
    }
}

module.exports = IncomeAction;