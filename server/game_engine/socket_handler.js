/**
 * @fileoverview Handler for socket requests
 * @author Luke Riddle
 */

class Handler {
    constructor(io, socket, player, room){
        this.io = io;
        this.socket = socket;
        this.player = player;
        this.room = room
    }

    listen(){
        this.socket.on('action', function(payload){
            try {
                this.player.doAction(payload.action, payload.target, payload.card);
                this.emitUpdate();
            } catch(e) {
                console.log("[EXCEPTION] doAction failed. ::socket_handler.js#listen::");
            }
        });

        this.socket.on('challenge', function(payload){
            try {
                this.player.doChallenge();
                this.emitUpdate();
            } catch(e) {
                console.log("[EXCEPTION] doChallenge failed. ::socket_handler.js#listen::");
            }
        });

        this.socket.on('loseInfluence', function(payload){
            try {
                this.player.loseInfluence(payload);
                this.emitUpdate();
            } catch(e) {
                console.log("[EXCEPTION] loseInfluence failed. ::socket_handler.js#listen::");
            }
        });

        this.socket.on('exchangeCards', function(payload){
            try { 
                this.player.exchangeCards(payload);
                this.emitUpdate();
            } catch(e) {
                console.log("[EXCEPTION] exchangeCards failed. ::socket_handler.js#listen::");
            }
        })

        this.socket.on('getUpdate', function(payload){
            try {
                this.emitUpdate();
            } catch(e) {
                console.log("[EXCEPTION] emitUpdate failed. ::socket_handler.js#listen::");
            }
        })
    }

    emitUpdate(){
        this.io.to(this.room).emit('gameUpdate', {
            player: this.player,
            otherPlayers: this.player.game.players,
            deck: this.player.game.deck,
            turn: this.player.game.turn
        })
    }
}

module.exports = Handler;