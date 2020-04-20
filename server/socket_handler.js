const Lobby = require("./lobby_engine/lobby");
const fs = require("fs");

var rooms = [];

module.exports = function (server) {
  var io = require("socket.io")(server);

  io.on("connection", (socket) => {
    console.log("New connection: " + socket.id);
    var uid;
    var lobbySession;

    // socket.on("checkUID", function(data, callback) {
    //   uid = data;

    //   var res;
    //   for(lobby of rooms){
    //       let players = lobby.getPlayers();
    //       res = players.findIndex(element => element.uId == uid);
    //       if(res > -1){
    //         lobby.updatePlayerId(res, socket);
    //         if(true){
    //             lobbySession = lobby;
    //             callback(lobby.roomCode);
    //         }
    //       } else {
    //           callback("notPlaying");
    //       }
    //   }

    // });

    socket.on("getRoomCode", function (data, callback) {
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
      } while (rooms.find((element) => element.id == name));

      callback(name);
    });

    socket.on("createLobby", function (payload, callback) {
      try {
        let lobby = new Lobby(payload, io);
        rooms.push(lobby);
        console.log("Lobby '" + payload + "' created.");
        callback("ok");
      } catch (err) {
        callback("err");
        console.log("Error in createLobby listener: " + err);
      }
    });

    socket.on("tryJoin", function (payload, callback) {
      let lobby = rooms.find((element) => element.roomCode == payload);

      if (!lobby || lobby.getNumPlayers() > 5 || lobby.isPlaying()) {
        callback("err");
      } else {
        callback("success");
      }
    });

    socket.on("joinLobby", function (payload, callback) {
      let lobby = rooms.find((element) => element.roomCode == payload.roomCode);

      try {
        lobby.addPlayer(payload.username, socket, uid);
        console.log(
          payload.username + " successfully joined lobby " + lobby.roomCode + "."
        );
        lobbySession = lobby;
        callback("success");
      } catch (err) {
        callback("err: " + err);
        console.log("Error in joinLobby listener: " + err);
      }
    });

    socket.on("disconnect", function () {
        if(lobbySession){
            setTimeout(function(){
                lobbySession.removePlayer(socket.id);
                if(lobbySession.getNumPlayers() == 0){
                    console.log('Removing lobby ' + lobbySession.roomCode + ' from rooms.');
                    rooms.splice(rooms.find(element => element.roomCode == lobbySession.roomCode), 1);
                }
            }, 5000)
        }
    });
  });
};
