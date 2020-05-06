const GamePlayer = require('../game_engine/player');
const Game = require('../game_engine/game');
const Handler = require('../game_engine/gameSocketHandler');

class Lobby {
    constructor(roomCode, io){
        this.roomCode = roomCode;
        this.players = [];
        this.socketList = [];
        this.playing = false;
        this.io = io;
        this.game;
        this.gamePlayers = [];
        this.lastWinner;
    }

    _findPlayerIndex(socketId){
        var index = this.players.findIndex(element => element.socId == socketId);
        return index;
    }

    addPlayer(name, socket, uid){
        socket.join(this.roomCode);
        this.players.push({name: name, socId: socket.id, uId: uid, isReady: false});
        this.socketList.push({name: name, socket: socket});
        this.broadcastUpdate();
    }

    removePlayer(socketId){
        var index = this._findPlayerIndex(socketId);
        if(index > -1){
            console.log('Removing player ' + this.players[index].name + ' from lobby ' + this.roomCode);
            let socket = this.socketList[index].socket;
            socket.leave(this.roomCode);
            this.players.splice(index, 1);
            this.socketList.splice(index, 1);
            this.broadcastUpdate()
        }
    }

    // updatePlayerId(index, socket){
    //     this.players[index].socId = socket.id;
    //     Sockets.listen(socket, this);
    // }

    broadcastUpdate(){
        this.io.in(this.roomCode).emit('updatePlayers', this.players);
    }

    broadcastStarted(){
        this.io.in(this.roomCode).emit('gameStarted', '');
    }

    toggleReady(socketId){
        var index = this._findPlayerIndex(socketId);
        this.players[index].isReady = !this.players[index].isReady;
        
        if(_allPlayersAreReady()){
            this.initGame();
        }
    }

    _allPlayersAreReady(){
        let start = true;
        for(var pl of this.players){
            if(!pl.isReady){
                start = false;
            }
        }
        return start;
    }

    initGame(){
        this._populatePlayerList();
        this.newGame();
        console.log('Game started in room ' + this.roomCode);
        this.playing = true;
        this.startGame();
    }

    _populatePlayerList(){
        for(var pl of this.socketList){
            let temp = new GamePlayer(pl.name);
            this.gamePlayers.push(temp);
            this._createSocketHandler(pl.socket, temp);
        }
    }

    _createSocketHandler(socket, player){
        let handler = new Handler(this.io, socket, player, this.roomCode);
        handler.listen();
    }

    newGame(){
        this.game = new Game(this.roomCode, this.gamePlayers, this.lastWinner);
        for(var gp of this.gamePlayers){
            gp.setGame(this.game);
            gp.clearCardsAndCoins();
        }
    }

    startGame(){
        this.game.start();
        this.broadcastStarted();
    }

    startAnotherGame(winner){
        if(this.game){
            this.lastWinner = winner;
            this.newGame();
            this.startGame();
        } else {
            console.log('[EXCEPTION] No active game. ::lobby.js#newGame::');
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

}

module.exports = Lobby;