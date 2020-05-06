/**
 * @fileoverview Game class
 * @author Luke Riddle
 */

 const Deck = require('./deck');
 const Turn = require('./turn');

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

    nextTurn(action, requiresResponse){
        if(this._checkGameOver()){
            this.turn.gameOver();
            return;
        }

        if(action){
            if(action == -1){
                this._incIndex();
                this.turn = new Turn(this.players[this.i], {value: 12})
            } else if(action.value == 6 || action.value == 10){
                this.turn = new Turn(this.players[this.i], action);
            } else if(!requiresResponse){
                this._incIndex();
                this.turn = new Turn(this.players[this.i], action);
            } else {
                this.turn = new Turn(action.target, action);
            }
        } else {
            console.log("[EXCEPTION] No action. ::game.js#nextTurn::");
        }
    }

    playerAction(action){
        if(action) {
            if(action.value == 6){
                this.nextTurn(action, false);
            } else if(!action.requiresResponse){
                this.nextTurn(action, false);
                action.succeed();
            } else {
                if(action.value == 5){
                    action.player.returnCoins(3);
                }
                this.nextTurn(action, true);
            }
        } else {
            console.log("[EXCEPTION] No action. ::game.js#playerAction::");
        }
    }

    playerChallenge(player){
        if(this.turn.lastAction.challenged()){
            let pl = this.turn.lastAction.player;
            this.turn.lastAction.fail();
            if(this.turn.lastAction && (this.turn.lastAction.value == 5 || this.turn.lastAction.value == 7)){
                this.nextTurn(-1, false);
            }
            this.playerLoseInfluence(pl);
        } else {
            if(this.turn.lastAction.value == 6) this.turn.stopTimeout();
            this.turn.lastAction.player.swapCard(this.turn.lastAction.character);
            this.playerLoseInfluence(player);
        }  
    }

    playerLoseInfluence(player){     
        let index = this.players.findIndex(element => element.id === player.id);
        if(index == -1) return;
        this.prevTurn = this.turn;
        this.turn = new Turn(player, undefined);
    }

    playerLostCard(){
        let pl = this.turn.activePlayer;
        this.turn = this.prevTurn;
        if(this.turn.lastAction && this.turn.lastAction.value == 6){
            this.turn.lastAction.succeed();
        }
        if(pl.isOut){
            this.nextTurn(-1, false);
        }
    }

    playerExchange(player){
        this.oldDeck = this.deck;
        this.oldCards = player.cards;

        let card1 = this.deck.draw(1)[0];
        let card2 = this.deck.draw(1)[0];

        player.addCard(card1);
        player.addCard(card2);
        this.turn = new Turn(player, undefined, true);
    }

    playerDidExchange(){
        this.nextTurn(-1, false);
    }

    start(){
        try {
            this.deck.deal(this.players);
            this.turn = new Turn(this.players[this.i], 1);
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

    _incIndex(){
        if(this.i == this.players.length - 1){
            this.i = 0;
        } else {
            this.i++;
        }

        if(this.players[this.i].isOut) this._incIndex();
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
 }

 module.exports = Game;