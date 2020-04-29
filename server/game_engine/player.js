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
        this.id = this._generateId();
    }

    /**
     * Associates the player with a game.
     * 
     * @param {Game} game 
     */
    setGame(game){
        this.game = game;
    }

    /**
     * Adds a card to the player's hand.
     * 
     * @param {Card} card 
     */
    addCard(card){
        try {
            this.cards.push(card);
        } catch(e){
            console.log(`[EXCEPTION] ${e} ::player.js#addCard::`);
            
        }
    }

    /**
     * Removes card from player.
     * 
     * Only to be used in exchanges. Not for
     * losing influence.
     * 
     * @param {Card} card 
     */
    removeCard(card){
        let index = this.cards.findIndex(element => element == card);
        this.cards.splice(index, 1);
    }

    /**
     * Adds coins to the player.
     * 
     * @param {int} num 
     */
    addCoins(num){
        this.coins += num;
    }

    /**
     * Makes a player's card Face Up.
     * 
     * If a player has no cards face down anymore,
     * they are out.
     * 
     * @param {Card} card
     */
    loseInfluence(card){
        let res = this.cards.find(element => card == element.value && !element.faceUp);

        if(res){
            res.turnFaceUp();
            this.game.playerLostCard();
            if(--this.cardsFaceDown == 0){
                this.game.playerOut(this);
            }
        } else {
            console.log("[EXCEPTION] Not a valid card to remove. ::player.js#loseInfluence::");
            
        }
    }

    /**
     * Calls game to exchange two cards.
     * 
     * @param {List of Cards} cards 
     */
    exchangeCards(cards){     
        try {
            let res1 = this.cards.find(element => cards[0] == element.value && !element.faceUp);
            this.game.deck.addCard(res1);
            this.removeCard(res1);

            let res2 = this.cards.find(element => cards[1] == element.value && !element.faceUp);
            this.game.deck.addCard(res2);
            this.removeCard(res2);

            this.game.playerDidExchange();
        } catch(e) {
            console.log("[EXCEPTION] Card exchange failed. ::player.js#exchangeCards:: " + e);
        }
    }

    /**
     * Takes coins from the player.
     * 
     * @param {int} num 
     */
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

    /**
     * Does an action.
     * 
     * @param {int} action 
     * @param {Player} target 
     * @param {int} card
     */
    doAction(action, tar, card){
        let target;
        if(tar){
            try{
                target = this.game.players.find(element => element.id == tar);
            } catch(e) {
                console.log('[EXCEPTION] Couldnt get target.\n' + e)
            }
        }
        var actn;
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

    /**
     * Challenges last action.
     */
    doChallenge(){
        this.game.playerChallenge(this);
    }

    _generateId(){
        return Math.random()*1024;
    }

}

module.exports = Player;