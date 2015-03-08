var express = require("express");
var app = express();
// var Firebase = require("firebase");
// var playerLocations = new Firebase("https://fiery-inferno-6891.firebaseio.com");

app.get("/", function(req, res) {
  res.sendfile('index.html');
});

app.get("/js/*", function(req, res) {
  var file = req.url.substring(1);
  res.sendfile(file);
});

app.get("/assets/*", function(req, res) {
  var file = req.url.substring(1);
  res.sendfile(file);
});

var server = app.listen(3000, function() {
    console.log("Listening on port %d", server.address().port);
});

//////////

// res.sendfile(path, {'root': '/path/to/root/directory'});


// res.sendFile(path.join(__dirname, '../public', 'index1.html'));
// res.sendFile('index1.html', { root: path.join(__dirname, '../public') });

// app.get('/hello.txt', function(req, res){
//   res.send('Hello World');
// });

// io.on('connection', function(socket){
  
  // console.log('a user connected');
  
  // socket.on('disconnect', function(){
  //   console.log('user disconnected');
  // });
  
// });

// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//     console.log('message: ' + msg);
//   });
// });

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });

//////////

// var app = require('express')();
// var http = require('http').Server(app);
// var Firebase = require("firebase")(http);

// app.get('/', function(req, res){
//   res.sendfile('index.html');
// });

// // io.on('connection', function(socket){
  
// //   console.log('a user connected');
  
// //   socket.on('disconnect', function(){
// //     console.log('user disconnected');
// //   });
  
// // });

// // io.on('connection', function(socket){
// //   socket.on('chat message', function(msg){
// //     io.emit('chat message', msg);
// //     console.log('message: ' + msg);
// //   });
// // });

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });
