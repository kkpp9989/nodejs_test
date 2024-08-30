// use library
var app = require('express')();
var http = require('http').Server(app);
var users = require('./users')
var io = require('socket.io')(http);
var router = require('express').Router();

// setting connection on localhost port 3000
http.listen(3000, function() {
    console.log('listening on *:3000');
 });
 

app.use(function (req, res, next) {
    req.io = io;
    next();
})

// set default route '/' to response file index.html
app.get('/', function(req, res) {
   res.sendFile(__dirname + '/views/index.html');
});

app.get('/get1', function (req, res) {
    res.sendFile(__dirname + '/views/get1.html');
})

app.get('/view', function (req, res) {
    res.sendFile(__dirname + '/views/view.html');
})

app.get('/user', function (req, res) {
    io.emit('proj1', "user");
    res.json(users.findAll())
})
  
app.get('/user/:id', function (req, res) {
    var id = req.params.id
    io.emit('proj1', "user by id:"+id);
    res.json(users.findById(id))
})

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    //console.log('A user connected');

    socket.on('proj1', (message) => {
        console.log('message : ', message);
        io.emit('proj1', message);
      });

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       //console.log('A user disconnected');
    });

 });

// var io_get1 = io.of('proj1');
// io_get1.on('connection', function(socket) {
//     socket.on('msg', function (message) {
//         console.log('proj1 : ' + message);
//       });
// });

module.exports = router;