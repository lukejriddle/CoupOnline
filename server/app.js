const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const router = require("./routes/router");

const app = express();
const server = http.createServer(app);
const io = require('./socket_handler')(server);

app.use(router);

server.listen(process.env.PORT || 5000, () => console.log("Sever started."));
