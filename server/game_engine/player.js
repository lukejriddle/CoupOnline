/**
 * @fileoverview Player class
 * @author Luke Riddle
 */

const ActionFactory = require('./actions/ActionFactory');

/**
 * Represents a player
 */
class Player {

    /**
     * Constructor.
     * 
     * @param {String} name 
     */
    constructor(name){
        this.name = name;
        this.game = undefined;
        this.cards = [];
        this.coins = 0;
        this.cardsFaceDown = 2;
        this.isOut = false;
        this.id = this._generateId();
    }

    setGame(game){
        this.game = game;
    }

    clearCardsAndCoins(){
        this.cards = [];
        this.coins = 0;
        this.cardsFaceDown = 2;
        this.isOut = false;
    }

    drawCards(num){
        let newCards = this.game.deck.draw(2);
        this.addCards(newCards);
    }

    addCards(cards){
        for(let card of cards){
            this.addCard(card);
        }
    }

    addCard(card){
        this.cards.push(card);
    }

    removeCard(card){
        let index = this.cards.findIndex(element => element == card);
        this.cards.splice(index, 1);
    }

    drawCoins(num){
        let temp = this.game.deck.removeCoins(num);
        this.addCoins(temp);
    }

    addCoins(num){
        this.coins += num;
    }


    returnCoinsToDeck(num){
        let temp = this.loseCoins(num);
        this.game.deck.addCoins(temp);
    }

    loseCoins(num){
        if(num <= this.coins){
            this.coins -= num;
            return num;
        } else {
            let temp = this.coins;
            this.coins = 0;
            return temp;
        }
    }

    swapCard(character){
        let cardAdded = this.game.deck.draw(1)[0];
        let index = this.cards.findIndex(element => element.value === character);
        let cardRemoved = this.cards.splice(index, 1, cardAdded)[0];
        this.game.deck.addCard(cardRemoved);
    }

    findCardInstanceByValue(value){
        try {
            return this.cards.find(element => value == element.value && !element.faceUp)
        } catch(e) {
            console.log("[EXCEPTION] Couldn't find card. ::player.js#findCardInstanceByValue::\n" + e);
        }
    }

    loseInfluence(value){
        let card = this.findCardInstanceByValue(value);

        try {
            card.turnFaceUp();
            if(--this.cardsFaceDown == 0){
                this.isOut = true;
                this.returnCoins(this.coins);
            }
        } catch(e) {
            console.log("[EXCEPTION] Not a valid card to remove. ::player.js#loseInfluence::\n" + e);
            
        }
    }


    exchangeCards(cards){     
        try {
            let res1 = this.findCardInstanceByValue(cards[0]);
            this.game.deck.addCard(res1);
            this.removeCard(res1);

            let res2 = this.findCardInstanceByValue(cards[1]);
            this.game.deck.addCard(res2);
            this.removeCard(res2);

            this.game.playerDidExchange();
        } catch(e) {
            console.log("[EXCEPTION] Card exchange failed. ::player.js#exchangeCards:: " + e);
        }
    }

    doAction(value, targetOrCard){
        if(targetOrCard > 5){
            targetOrCard = this._getTarget(targetOrCard)
        }
        let action = ActionFactory.create(value, this, targetOrCard);

        action.execute();
        
    }

    doChallenge(){
        this.game.playerChallenge(this);
    }

    _generateId(){
        return Math.random()*1024;
    }

    _getTarget(tar){
        try{
            return this.game.players.find(element => element.id == tar);
        } catch(e) {
            console.log('[EXCEPTION] Couldnt get target.\n' + e)
        }
    }

}

module.exports = Player;