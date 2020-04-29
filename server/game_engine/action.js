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
            switch(this.value){
                case 1: // income
                    this.player.addCoins(1);
                    this.player.game.deck.removeCoins(1);
                    break;
                case 2: // foreign aid
                    this.player.addCoins(2);
                    this.player.game.deck.removeCoins(2);
                    break;
                case 3: // tax
                    this.player.addCoins(3);
                    this.player.game.deck.removeCoins(3);
                    break;
                case 4: // coup
                    this.player.loseCoins(7);
                    this.player.game.deck.addCoins(7);
                    this.player.game.playerLoseInfluence(this.target);
                    break;
                case 5: // assassinate
                    //taking the players coins will be handled elsewhere
                    this.player.game.playerLoseInfluence(this.target);
                    break;
                case 6: // exhange
                    console.log('Exchange succeeded, going to game playerExchange.');
                    this.player.game.playerExchange(this.player, this);
                    break;
                case 7: // steal
                    let stolen = this.target.loseCoins(2);
                    this.player.addCoins(stolen);
                    break;
                case 8: // block assassination
                    this.responseTo.fail();
                    break;
                case 9: // block steal
                    this.responseTo.fail();
                    break;
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
                    this.player.loseCoins(2);
                    this.player.game.deck.addCoins(2);
                    break;
                case 3: // tax
                    this.player.loseCoins(3);
                    this.player.game.deck.addCoins(3);
                    break;
                case 5: // assassinate
                    break;
                case 7: // steal
                    break;
                case 6:
                    this.player.game.turn.stopTimeout();
                    this.player.game.nextTurn(-1, false);
                    break;
                case 8: // block assassination
                    this.responseTo.succeed();
                    break;
                case 9: // block steal
                    this.responseTo.succeed();
                    break;
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
            console.log('Action challenged: ' + this.value);
            console.log('Need card: ' + this.character);
            console.log('Player challenged: ' + this.player.name);
            console.log('Players cards: ' + util.inspect(this.player.cards));
            this.canChallenge = false;
            let index = this.player.cards.findIndex(element => element.value == this.character && !element.faceUp)
            if(index == -1){
                console.log('Returning true - challenge successful');
                if(this.value == 6) this.succeeded = true;
                return true;
            } else return false;
        } else {
            console.log("[EXCEPTION] Action cannot be challenged. ::action.js#challenged::");
            return false;
        }
    }
}

module.exports = Action;