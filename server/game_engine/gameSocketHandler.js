/**
 * @fileoverview Handler for socket requests
 * @author Luke Riddle
 */

const { stringify, parse } = require('flatted');

class Handler {
    constructor(io, socket, player, room){
        this.io = io;
        this.socket = socket;
        this.player = player;
        this.room = room
    }

    listen(){
        var self = this;

        this.socket.on('action', function(payload){
            payload = parse(payload);
            console.log('got Action: ' + payload.action + payload.target + payload.card);
            try {
                self.player.doAction(payload.action, payload.target, payload.card);
                self.emitUpdate();
                self.broadcastRequire();
            } catch(e) {
                console.log("[EXCEPTION] doAction failed. ::socket_handler.js#listen::\n" + e);
            }
        });

        this.socket.on('challenge', function(payload){
            payload = parse(payload);
            try {
                self.player.doChallenge();
                self.emitUpdate();
                self.broadcastRequire();
            } catch(e) {
                console.log("[EXCEPTION] doChallenge failed. ::socket_handler.js#listen::\n" + e);
            }
        });

        this.socket.on('loseInfluence', function(payload){
            payload = parse(payload);
            try {
                self.player.loseInfluence(payload);
                self.emitUpdate();
                self.broadcastRequire();
            } catch(e) {
                console.log("[EXCEPTION] loseInfluence failed. ::socket_handler.js#listen::\n" + e);
            }
        });

        this.socket.on('exchangeCards', function(payload){  
            payload = parse(payload);        
            try { 
                self.player.exchangeCards(payload);
                self.emitUpdate();
                self.broadcastRequire();
            } catch(e) {
                console.log("[EXCEPTION] exchangeCards failed. ::socket_handler.js#listen::");
            }
        })

        this.socket.on('getUpdate', function(payload){
            payload = parse(payload);
            try {
                self.emitUpdate();
            } catch(e) {
                console.log("[EXCEPTION] emitUpdate failed. ::socket_handler.js#listen:: \n" + e);
            }
        })
    }

    emitUpdate(){
        this.socket.emit('gameUpdate', stringify({
                player: this.player,
                game: this.player.game
            })
        )
    }

    broadcastRequire(){
        this.socket.to(this.room).emit('requireUpdate', '');
    }

}

module.exports = Handler;