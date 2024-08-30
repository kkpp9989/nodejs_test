const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
app.use(cors());
const server = http.createServer(app);

const users = require('./users')


const io = require("socket.io")(server, {
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
    },
});

app.use(function (req, res, next) {
    req.io = io;
    next();
});

app.post('/api/post', function(req, res) {
    //this is coming from an external resource
    req.io.emit('chatter', "ASD");
    //res.json(users.findAll())
 })

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('chatter', (message) => {
    console.log('chatter : ', message);
    //io.emit('chatter', message);
  });

  socket.on("Disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("SERVER WALKING");
});