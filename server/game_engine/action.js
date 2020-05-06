/**
 * @fileoverview Action class
 * @author Luke Riddle
 */

const Player = require('./player');
const Card = require('./card');
const util = require('util');

class Action {
    /**
     * Constructor.
     * 
     * @param {int} Value
     * @param {Player} player 
     * @param {Player} target 
     * @param {Action} responseTo 
     * @param {Card} character 
     * @param {boolean} canChallenge 
     * @param {boolean} requiresResponse 
     */
    constructor(value, player, target, responseTo, character, canChallenge, requiresResponse) {
        this.value = value;
        this.player = player;
        this.target = target;
        this.responseTo = responseTo,
        this.character = character;
        this.canChallenge = canChallenge;
        this.requiresResponse = requiresResponse;
        this.succeeded = false;
    }

    /**
     * Incorporates effects of the action.
     * 
     * Actions are successful if they are not challenged
     * or blocked. Actions that require no response (all but 
     * Steal and Assassinate) are automatically successful.
     */
    succeed(){
        if(!this.succeeded){
            let temp;
            switch(this.value){
                case 1: // income
                    this.player.drawCoins(1);
                    break;
                case 2: // foreign aid
                    this.player.drawCoins(2);
                    break;
                case 3: // tax
                    this.player.drawCoins(3);
                    break;
                case 4: // coup
                    this.player.returnCoins(7);
                    this.player.game.playerLoseInfluence(this.target);
                    break;
                case 5: // assassinate
                    this.player.game.playerLoseInfluence(this.target);
                    break;
                case 6: // exhange
                    this.player.game.playerExchange(this.player, this);
                    break;
                case 7: // steal
                    let stolen = this.target.loseCoins(2);
                    this.player.addCoins(stolen);
                    break;
                case 8: // block assassination
                case 9: // block steal
                case 10: // block foreign aid
                    this.responseTo.fail();
                    break;
                case 11: // allow
                    this.responseTo.succeed();
                    break;
                default:
                    console.log("[EXCEPTION] Not a valid action. ::action.js#succeed::");
            }
            this.succeeded = true;
        }
    }

    /**
     * Handles the failing of the action.
     */
    fail(){
        if(this.succeeded){
            switch(this.value){
                case 2: // foreign aid
                    this.player.returnCoins(2);
                    break;
                case 3: // tax
                    this.player.returnCoins(3);
                    break;
                case 5: // assassinate
                    if(!this.canChallenge){
                        let temp = this.player.game.deck.removeCoins(3);
                        this.player.addCoins(temp);
                    }
                    break;
                case 6:
                    this.player.game.turn.stopTimeout();
                    this.player.game.nextTurn(-1, false);
                    break;
                case 8: // block assassination
                case 9: // block steal
                case 10: // block foreign aid
                    this.responseTo.succeed();
                    break;
                default:
                    console.log("[EXCEPTION] Not a valid action. ::action.js#fail::");
                    break;
            }
            this.succeeded = false;
        }
    }

    /**
     * Handles an action being challenged. 
     * 
     * Only actions that require a character (this.character !== undefined)
     * may be challenged. All but income, foreign aid, and coup.
     * 
     * @returns {boolean} Whether or not the challenge succeeded.
     */
    challenged(){
        if(this.canChallenge){
            this.canChallenge = false;
            let index = this.player.cards.findIndex(element => element.value == this.character && !element.faceUp)
            if(index == -1){
                console.log('Returning true - challenge successful');
                if(this.value == 6 || this.value == 5) this.succeeded = true;
                return true;
            } else return false;
        } else {
            console.log("[EXCEPTION] Action cannot be challenged. ::action.js#challenged::");
            return false;
        }
    }
}

module.exports = Action;