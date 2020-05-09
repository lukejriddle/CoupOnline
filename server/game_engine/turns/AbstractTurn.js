class AbstractTurn {
    constructor(activePlayer){
        this.activePlayer = activePlayer;
    }

    gameOver(){
        this.availableActions = [-3];
        this.message = undefined;
    }
}

module.exports = AbstractTurn;