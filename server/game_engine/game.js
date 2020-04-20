/**
 * @fileoverview Game class
 * @author Luke Riddle
 */

 const Player = require('./player');
 const Deck = require('./deck');
 const Turn = require('./turn');
 const Action = require('./action');

 class Game {
    constructor(id, players){
        this.id = id;
        this.players = players;
        this.deck = new Deck();
        this.turn;
        this.i = 0; // player turn index
        this.prevTurn;
        this.oldDeck;
        this.oldPlayer;
    }

    nextTurn(action, requiresResponse){
        if(action){
            if(!requiresResponse){
                this._incIndex();
                this.turn = new Turn(this, this.players[this.i], action);
            } else {
                this.turn = new Turn(this, action.target, action);
            }
        } else {
            console.log("[EXCEPTION] No action. ::game.js#playerAction::");
        }
    }

    playerAction(action){
        if(action) {
            if(action.value == 6){
                action.succeed();
            }
            else if(!action.requiresReponse){
                action.succeed();
                this.nextTurn(action, false);
            } else {
                this.nextTurn(action, true);
            }
        } else {
            console.log("[EXCEPTION] No action. ::game.js#playerAction::");
        }
    }

    playerChallenge(player){
        if(this.turn.lastAction.challenged()){
            this.turn.lastAction.fail();
            this.playerLoseInfluence(this.turn.lastAction.player);
        } else {
            this.playerLoseInfluence(player);
        }
    }

    playerLoseInfluence(player){
        this.prevTurn = this.turn;
        this.turn = new Turn(this, player, undefined);
    }

    playerLostCard(){
        this.turn = prevTurn;
    }

    playerExchange(player, action){
        this.oldDeck = this.deck;
        this.oldPlayer = this.player;

        let card1 = this.deck.draw();
        let card2 = this.deck.draw();

        player.addCard(card1);
        player.addCard(card2);
        this.turn = new Turn(this, player, action, true);
    }

    playerDidExchange(){
        this.nextTurn(this.turn.lastAction, false);
    }

    revertExchange(player){
        let index = this.players.findIndex(element => element == player);
        this.players[index] = this.oldPlayer;
        this.deck = this.oldDeck;

        this.oldPlayer = undefined;
        this.oldDeck = undefined;
    }

    playerOut(player){
        let index = this.players.findIndex(element => element == player);
        if(index > -1){
            this.players.splice(index, 1);
        } else {
            console.log("[EXCEPTION] Player not in list. ::game.js#playerOut::");
            
        }
    }

    start(){
        try {
            this.deck.deal(this.players);
            this.turn = new Turn(this, this.players[this.i], 1);
        } catch(e) {
            console.log("[EXCEPTION] Error in starting game. ::game.js#start:: \n" + e);
        }
    }

    _incIndex(){
        if(this.i == this.players.length - 1){
            this.i = 0;
        } else {
            this.i++;
        }
    }
 }

 module.exports = Game;