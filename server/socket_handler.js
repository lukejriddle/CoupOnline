const LobbySocketHandler = require('./lobby_engine/lobbySocketHandler');
const RoomManager = require('./RoomManager');

var rooms = [0,1];

module.exports = function (server) {
  var io = require("socket.io")(server);
  var roomManager = new RoomManager();

  io.on("connection", (socket) => {
    console.log("New connection: " + socket.id);
    let handler = new LobbySocketHandler(socket, roomManager, io);
    handler.listen();
    // var uid;
    // var lobbySession;

    // // socket.on("checkUID", function(data, callback) {
    // //   uid = data;

    // //   var res;
    // //   for(lobby of rooms){
    // //       let players = lobby.getPlayers();
    // //       res = players.findIndex(element => element.uId == uid);
    // //       if(res > -1){
    // //         lobby.updatePlayerId(res, socket);
    // //         if(true){
    // //             lobbySession = lobby;
    // //             callback(lobby.roomCode);
    // //         }
    // //       } else {
    // //           callback("notPlaying");
    // //       }
    // //   }

    // // });
  });
};
