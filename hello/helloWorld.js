var http = require('http');
var FileReader = require("../FileReader/FileReader.js");

var port = 8081;

var s = http.createServer(function(request, response) {
    response.writeHead(200);
    response.write("Hello world");
    var object = new FileReader("/thales/data/neighborlink.dat");
    response.end();
});

s.listen(port);

console.log("Listening on http://127.0.0.1:" + port + "/");
