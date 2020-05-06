/**
 * @fileoverview Player class
 * @author Luke Riddle
 */

const Game = require('./game');
const Card = require('./card');
const Action = require('./action');
const util = require('util');

const CARDTYPES = {
    AMBASSADOR: 1,
    ASSASSIN: 2,
    CAPTAIN: 3,
    CONTESSA: 4,
    DUKE: 5
}

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

    addCard(card){
        this.cards.push(card);
    }

    removeCard(card){
        let index = this.cards.findIndex(element => element == card);
        this.cards.splice(index, 1);
    }

    addCoins(num){
        this.coins += num;
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

    returnCoins(num){
        let temp = this.loseCoins(num);
        this.game.deck.addCoins(temp);
    }

    drawCoins(num){
        let temp = this.game.deck.removeCoins(num);
        this.addCoins(temp);
    }

    swapCard(character){
        let cardAdded = this.game.deck.draw(1)[0];
        let index = this.cards.findIndex(element => element.value === character);
        let cardRemoved = this.cards.splice(index, 1, cardAdded)[0];
        this.game.deck.addCard(cardRemoved);
    }

    _findCardInstanceByValue(value){
        try {
            return this.cards.find(element => value == element.value && !element.faceUp)
        } catch(e) {
            console.log("[EXCEPTION] Couldn't find card. ::player.js#_findCardInstanceByValue::\n" + e);
        }
    }

    loseInfluence(value){
        let card = this._findCardInstanceByValue(value);

        try {
            card.turnFaceUp();
            if(--this.cardsFaceDown == 0){
                this.isOut = true;
                this.returnCoins(this.coins);
            }
            this.game.playerLostCard();
        } catch(e) {
            console.log("[EXCEPTION] Not a valid card to remove. ::player.js#loseInfluence::\n" + e);
            
        }
    }


    exchangeCards(cards){     
        try {
            let res1 = this._findCardInstanceByValue(cards[0]);
            this.game.deck.addCard(res1);
            this.removeCard(res1);

            let res2 = this._findCardInstanceByValue(cards[1]);
            this.game.deck.addCard(res2);
            this.removeCard(res2);

            this.game.playerDidExchange();
        } catch(e) {
            console.log("[EXCEPTION] Card exchange failed. ::player.js#exchangeCards:: " + e);
        }
    }

    doAction(action, tar, card){
        let target;
        if(tar) target = this._getTarget(tar);
    
        let actn;
        switch (action) {
            case 1: //income
                actn = new Action(1, this, undefined, undefined, undefined, false, false);
                break;
            case 2: //foreign aid
                actn = new Action(2, this, undefined, undefined, undefined, false, false);
                break;
            case 3: // tax
                actn = new Action(3, this, undefined, undefined, CARDTYPES.DUKE, true, false);
                break;
            case 4: // coup
                actn = new Action(4, this, target, undefined, undefined, false, false);
                break;
            case 5: // assassinate
                actn = new Action(5, this, target, undefined, CARDTYPES.ASSASSIN, true, true);
                break;
            case 6: // exchange
                actn = new Action(6, this, undefined, undefined, CARDTYPES.AMBASSADOR, true, false);
                break;
            case 7: // steal
                actn = new Action(7, this, target, undefined, CARDTYPES.CAPTAIN, true, true);
                break;
            case 8: // block assassination
                actn = new Action(8, this, this.game.turn.lastAction.player, this.game.turn.lastAction, 
                    CARDTYPES.CONTESSA, true, false);
                break;
            case 9: // block steal
                actn = new Action(9, this, this.game.turn.lastAction.player, this.game.turn.lastAction, 
                    card, true, false);
                break;
            case 10: // block foreign aid
                actn = new Action(10, this, this.game.turn.lastAction.player, this.game.turn.lastAction,
                    CARDTYPES.DUKE, true, false);
                break;
            case 11: // allow
                actn = new Action(11, this, undefined, this.game.turn.lastAction,
                    undefined, false, false);
                break;
            default:
                break;
        }

        if(actn){
            this.game.playerAction(actn);
        } else {
            console.log("[EXCEPTION] Not a valid action. ::player.js#doAction::");
            
        }
        
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