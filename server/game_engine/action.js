/**
 * @fileoverview Action class
 * @author Luke Riddle
 */

const Player = require('./player');
const Card = require('./card');

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
    }

    /**
     * Incorporates effects of the action.
     * 
     * Actions are successful if they are not challenged
     * or blocked. Actions that require no response (all but 
     * Steal and Assassinate) are automatically successful.
     */
    succeed(){
        switch(this.value){
            case 1: // income
                this.player.addCoins(1);
                break;
            case 2: // foreign aid
                this.player.addCoins(2);
                break;
            case 3: // tax
                this.player.addCoins(3);
                break;
            case 4: // coup
                this.player.loseCoins(7);
                this.game.playerLoseInfluence(target);
                break;
            case 5: // assassinate
                //taking the players coins will be handled elsewhere
                this.game.playerLoseInfluence(target);
                break;
            case 6: // exhange
                this.game.playerExchange(player, this);
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
                ;
        }
    }

    /**
     * Handles the failing of the action.
     */
    fail(){
        switch(this.value){
            case 2: // foreign aid
                this.player.loseCoins(2);
                break;
            case 3: // tax
                this.player.loseCoins(3);
                break;
            case 5: // assassinate
                break;
            case 6: // exhange
                this.player.game.revertExchange(this.player);
                break;
            case 7: // steal
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
                ;
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
            let index = this.player.cards.findIndex(element => element.value == this.value)
            if(index == -1){
                return true;
            } else return false;
        } else {
            console.log("[EXCEPTION] Action cannot be challenged. ::action.js#challenged::");
            return false;
        }
    }
}

module.exports = Action;