var express = require('express');
var app = express();

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
