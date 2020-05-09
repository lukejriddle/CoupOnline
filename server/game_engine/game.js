/**
 * @fileoverview Game class
 * @author Luke Riddle
 */

 const Deck = require('./deck');
 const LoseInfluenceTurn = require('./turns/LoseInfluenceTurn');
 const ActionTurn = require('./turns/ActionTurn');
 const util = require('util');


 class Game {
    constructor(id, players, winner){
        this.id = id;
        this.players = players;
        this.deck = new Deck();
        this.turn;
        this.i = this._getFirstPlayer(winner); // player turn index
        this.prevTurn;
        this.isOver = false;
        this.winner;
    }

    playerChallenge(challenger){
        let challengee = this.turn.lastAction.player;
        let challengeMessage;

        if(this.turn.lastAction.challenge()){
            challengeMessage = this._generateChallengeMessage(challenger, challengee, true);
            this.turn.lastAction.fail();
            this.playerLoseInfluence(challengee, challengeMessage);
        } else {
            challengeMessage = this._generateChallengeMessage(challenger, challengee, false);
            this.turn.lastAction.player.swapCard(this.turn.lastAction.character);
            this.playerLoseInfluence(challenger, challengeMessage);
        }  
    }

    _generateChallengeMessage(challenger, challengee, succeeded){
        return `${challenger.name} challenged ${challengee.name} - and ` + (succeeded ? `won!` : `lost!`);
    }

    playerLoseInfluence(player, message){     
        this.prevTurn = this.turn;
        this.nextTurn(new LoseInfluenceTurn(player, {message: message}));
    }

    playerLostCard(player){
        let pl = this.turn.activePlayer;
        this.nextTurn(this.prevTurn);
        if(pl.isOut){
            this.nextTurn(new ActionTurn(this.nextPlayer(), this.turn.lastAction));
        }
        this._appendLostCardMessage(player);
    }

    _appendLostCardMessage(player){
        this.turn.lastAction.secondMessage = player.name + " lost a card.";
    }

    playerDidExchange(){
        this.turn.lastAction.message = `${this.turn.lastAction.player.name} exchanged cards!`;
        this.nextTurn(new ActionTurn(this.nextPlayer(), this.turn.lastAction));
    }

    nextTurn(turn){
        if(this._checkGameOver())
            this._endGame();

        this.turn = turn;
    }

    _checkGameOver(){
        let count = 0;
        let winner;
        for(let pl of this.players){
            if(pl.isOut) count++;
            else winner = pl;
        }
        if(count == 1){
            this.isOver = true;
            this.winner = winner;
            return true;
        }
        return false;
    }

    _endGame(){
        this.turn.gameOver();
    }

    start(){
        try {
            this.deck.deal(this.players);
            this.nextTurn(new ActionTurn(this.players[this.i], 1));
        } catch(e) {
            console.log("[EXCEPTION] Error in starting game. ::game.js#start:: \n" + e);
        }
    }

    _getFirstPlayer(winner){
        if(!winner) return 0;
        else {
            return this.players.findIndex(element => element.id == winner);
        }
    }

    nextPlayer(){
        if(this.i == this.players.length - 1){
            this.i = 0;
        } else {
            this.i++;
        }

        if(this.players[this.i].isOut) this.nextPlayer();
        else return this.players[this.i];
    }

    
 }

 module.exports = Game;