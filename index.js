var http = require("http");
var fs = require("fs");
var extract = require("./extract");
// var wss = require("./websockets-server");
// var path = require("path");
var mime = require("mime");

var handleError = function (err, res) {
  fs.readFile("app/error.html", function (err, data) {
    res.writeHead(404);
    res.end(data);
  });
};

var server = http.createServer(function (req, res) {
  console.log("Responding to a request.");
  var filePath = extract(req.url);
  var type = mime.getType(filePath);
  var extension = mime.getExtension(type);
  fs.readFile(filePath, function (err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.setHeader("Content-Type", extension);
      res.end(data);
    }
  });
});
server.listen(3000);
