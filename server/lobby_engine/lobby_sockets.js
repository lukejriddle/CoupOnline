function listen(socket, lobby){
    socket.on('getPlayers', function(data, callback){
        callback(lobby.getPlayers());
    })

    socket.on('toggleReady', function(data, callback){
        try {
            lobby.toggleReady(socket.id);
            lobby.broadcastUpdate();
            callback('success');
        } catch(err) {
            callback('error: ' + err);
            console.log('error in toggleReady listener for lobby: ' + err);
        }
    })
}

module.exports = { listen };