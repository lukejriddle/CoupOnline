/**
 * @fileoverview Turn class
 * @author Luke Riddle
 */

const Game = require('./game');
const Player = require('./player');

/**
 * This class represents a turn in the game.
 * 
 * Each turn has one active player, who can do an
 * action to end the turn. Turns do not always go in
 * order, as some actions require responses. The player
 * that need respond has the next turn. After the response,
 * turns continue to go in order. @see Game#nextTurn
 */
class Turn {

    /**
     * Constructor
     * 
     * @param {Game} game 
     * @param {Player} player 
     * @param {Action} action 
     */
    constructor(game, player, action, isExchange) {
        this.game = game;
        this.activePlayer = player;
        this.lastAction = action;
        this.time = 45;
        this.isExchange = isExchange;
        this.availableActions = this._getAvailableResponses();
    }

    /**
     * Gets lastAction attribute
     * 
     * @returns {Action} lastAction
     */
    getLastAction(){
        return this.lastAction;
    }

    _getAvailableResponses(){
        if(this.isExchange){
            return [-2];
        } else if(this.lastAction){
            switch(this.lastAction.value){
                case 5:
                    return [8, 11];
                case 7:
                    return [9, 11];
                default:
                    if(this.activePlayer.coins >= 10) return [4];
                    let res = [1, 2, 3, 5, 6, 7];
                    if(this.activePlayer.coins >= 7) res.push(4);
                    return res;
            }
        } else {
            return [-1]; // lose influence
        }
    }

}

module.exports = Turn;