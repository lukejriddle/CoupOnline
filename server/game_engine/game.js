/**
 * @fileoverview Game class
 * @author Luke Riddle
 */

 const Player = require('./player');
 const Deck = require('./deck');
 const Turn = require('./turn');
 const Action = require('./action');
 const util = require('util');

 class Game {
    constructor(id, players){
        this.id = id;
        this.players = players;
        this.deck = new Deck();
        this.turn;
        this.i = 0; // player turn index
        this.prevTurn;
    }

    nextTurn(action, requiresResponse){
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
            }else if(!action.requiresResponse){
                this.nextTurn(action, false);
                action.succeed();
            } else {
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
            this.playerLoseInfluence(pl);
        } else {
            if(this.turn.lastAction.value == 6) this.turn.stopTimeout();;
            this.playerLoseInfluence(player);
        }  
    }

    playerLoseInfluence(player){
        this.prevTurn = this.turn;
        this.turn = new Turn(player, undefined);
    }

    playerLostCard(){
        this.turn = this.prevTurn;
        if(this.turn.lastAction.value == 6){
            this.turn.lastAction.succeed();
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

    playerOut(player){
        let index = this.players.findIndex(element => element == player);
        if(index > -1){
            this.players.splice(index, 1);
            console.log('Player removed!');
        } else {
            console.log("[EXCEPTION] Player not in list. ::game.js#playerOut::");
            
        }
    }

    start(){
        try {
            this.deck.deal(this.players);
            this.turn = new Turn(this.players[this.i], 1);
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