const AbstractAction = require('./AbstractAction');

class CoupAction extends AbstractAction {
    constructor(player, target){
        super(player);
        this.canChallenge = false;
        this.target = target;
        this.message = `${this.player.name} couped ${this.target.name}!`;
    }

    succeed(){
        this.player.returnCoinsToDeck(7);
        this.player.game.playerLoseInfluence(this.target);
    }
}

module.exports = CoupAction;