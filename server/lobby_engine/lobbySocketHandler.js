const Lobby = require("./lobby");
const fs = require("fs");

class LobbySocketHandler {
    constructor(socket, room, io){
        this.socket = socket;
        this.roomManager = room;
        this.io = io;
        this.lobby;
    }

    listen(){
        var self = this;
        this.socket.on("getRoomCode", function (data, callback) {
            let rooms = self.roomManager.getRooms();
            var name;
            var adjs = fs.readFileSync("txt/adjectives.txt", "utf8").split("\r\n");
            var nouns = fs.readFileSync("txt/nouns.txt", "utf8").split("\r\n");
      
            do {
                name = "";
                var ad = adjs[Math.floor(Math.random() * adjs.length)];
                var noun = nouns[Math.floor(Math.random() * nouns.length)];
                name += ad;
                name += noun;
                name.toLowerCase();
            } while (self.roomManager.findRoom(name));
      
            callback(name);
        });

        this.socket.on("createLobby", function (payload, callback) {
            try {
                let lobby = new Lobby(payload, self.io);
                self.roomManager.addRoom(lobby);
                console.log("Lobby '" + payload + "' created.");
                callback("ok");
            } catch (err) {
                callback("err");
                console.log("Error in createLobby listener: " + err);
            }
        });

        this.socket.on("tryJoin", function (payload, callback) {
            let lobby = self.roomManager.findRoom(payload);
      
            if (!lobby || lobby.getNumPlayers() > 5 || lobby.isPlaying()) {
                callback("err");
            } else {
                callback("success");
            }
        });

        this.socket.on("joinLobby", function (payload, callback) {
            let lobby = self.roomManager.findRoom(payload.roomCode);
      
            try {
                if(self.lobby) self.lobby.removePlayer(self.socket.id);
      
                lobby.addPlayer(payload.username, self.socket);
                console.log(
                    payload.username + " successfully joined lobby " + lobby.roomCode + "."
                );
                self.lobby = lobby;
                callback("success");
            } catch (err) {
                callback("err: " + err);
                console.log("Error in joinLobby listener: " + err);
            }
        });

        this.socket.on('getPlayers', function(data, callback){
            if(self.lobby){
                callback(self.lobby.getPlayers());
            }
        })
    
        this.socket.on('toggleReady', function(data, callback){
            try {
                self.lobby.toggleReady(self.socket.id);
                self.lobby.broadcastUpdate();
                callback('success');
            } catch(err) {
                callback('error: ' + err);
                console.log('error in toggleReady listener for lobby: ' + err);
            }
        })
    
        this.socket.on('startAnotherGame', function(data){
            self.lobby.startAnotherGame(data);
        })

        this.socket.on("disconnect", function () {
            if(self.lobby){
                setTimeout(function(){
                    self.lobby.removePlayer(self.socket.id);
                    if(self.lobby.getNumPlayers() == 0){
                        console.log('Removing lobby ' + self.lobby.roomCode + ' from rooms.');
                        self.roomManager.removeRoom(self.lobby.roomCode);
                    }
                }, 5000)
            }
        });

    }
}

module.exports = LobbySocketHandler;