const GamePlayer = require('../game_engine/player');
const Game = require('../game_engine/game');
const Handler = require('../game_engine/socket_handler');

const Sockets = require('./lobby_sockets');

var util = require('util');

class Lobby {
    constructor(roomCode, io){
        this.roomCode = roomCode;
        this.players = [];
        this.socketList = [];
        this.playing = false;
        this.io = io;
    }

    _findPlayer(socketId){
        var index = this.players.findIndex(element => element.socId == socketId);
        return index;
    }

    addPlayer(name, socket, uid){
        socket.join(this.roomCode);
        this.players.push({name: name, socId: socket.id, uId: uid, isReady: false});
        this.socketList.push({name: name, socket: socket});
        Sockets.listen(socket, this);
        this.broadcastUpdate();
    }

    removePlayer(socketId){
        var index = this._findPlayer(socketId);
        if(index > -1){
            console.log('Removing player ' + this.players[index].name + ' from lobby ' + this.roomCode);
            this.players.splice(index, 1);
            this.broadcastUpdate()
        }
    }

    updatePlayerId(index, socket){
        this.players[index].socId = socket.id;
        Sockets.listen(socket, this);
    }

    broadcastUpdate(){
        this.io.in(this.roomCode).emit('updatePlayers', this.players);
    }

    broadcastStarted(){
        this.io.in(this.roomCode).emit('gameStarted', '');
    }

    toggleReady(socketId){
        var index = this._findPlayer(socketId);
        this.players[index].isReady = !this.players[index].isReady;

        let start = true;
        for(var pl of this.players){
            if(!pl.isReady){
                start = false;
            }
        }

        if(start){
            this.startGame();
        }
    }

    getPlayers(){
        return this.players;
    }

    getNumPlayers(){
        return this.players.length;
    }

    isPlaying(){
        return this.playing;
    }

    startGame(){
        console.log("start game");
        var gamePlayers = [];
        for(var pl of this.socketList){
            let temp = new GamePlayer(pl.name);
            gamePlayers.push(temp);
            var handler = new Handler(this.io, pl.socket, temp, this.roomCode);
            handler.listen();
        }
        console.log('making game');
        var game = new Game(this.roomCode, gamePlayers);
        console.log('setting game');
        for(var gp of gamePlayers){
            gp.setGame(game);
            console.log(util.inspect(gp));
        }

        console.log('starting game');
        game.start();
        this.broadcastStarted();
        
    }

}

module.exports = Lobby;