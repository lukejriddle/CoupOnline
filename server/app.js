const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require('path');
//const router = require("./routes/router");

const app = express();
const server = http.createServer(app);
const io = require('./socket_handler')(server);


app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(process.env.PORT || 5000, () => console.log("Sever started."));
