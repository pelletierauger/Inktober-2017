var http = require('http');
var path = require('path');
var fs = require('fs');
var filenameFormatter = require('./filename-formatter.js');
var JSONs = [];

function jsonify(obj) { return JSON.stringify(obj, null, 2) }

var graphJSON = function(path, name) {
    this.name = name;
    console.log(path);
    this.graph = JSON.parse(fs.readFileSync(path));
    JSONs.push(this);
};

loadJSONs();

function handleRequest(req, res) {
    // What did we request?
    var pathname = req.url;
    // If blank let's ask for index.html
    if (pathname == '/') {
        pathname = '/index.html';
    }
    // Ok what's our file extension
    var ext = path.extname(pathname);
    // Map extension to file type
    var typeExt = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css'
    };

    //What is it?  Default to plain text
    var contentType = typeExt[ext] || 'text/plain';
    // Now read and write back the file with the appropriate content type
    fs.readFile(__dirname + pathname, function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading ' + pathname);
        }
        // Dynamically setting content type
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

// Create a server with the handleRequest callback
var server = http.createServer(handleRequest);
// Listen on port 8080
server.listen(8080);
console.log('Server started on port 8080');

var io = require('socket.io').listen(server);

var clients = {};

io.sockets.on('connection', function(socket) {
    console.log("Client " + socket.id + " is connected.");

    socket.on('pullJSONs', function() {
        io.sockets.emit('pushJSONs', JSONs);
    });

    socket.on('mouse', function(data) {
        // Data comes in as whatever was sent, including objects
        console.log("Received: 'mouse' " + data.x + " " + data.y);
        // Send it to all other clients
        socket.broadcast.emit('mouse', data);
    });

    socket.on('bounce', function(data) {
        console.log(data);
    });

    socket.on('savePoints', function(data) {
        console.log(data);
        data = JSON.stringify(data);
        var fileName = filenameFormatter(Date());
        fileName = fileName.slice(0, fileName.length - 13);
        fs.writeFile("./JSONs/" + fileName + '.json', data, function(err) {
            if (err) {
                return console.error(err);
            } else {
                console.log("./JSONs/" + fileName + '.json written successfully.');
            }
        });
    });
});

function loadJSONs() {
    try {
        var files = fs.readdirSync("./JSONs");
    } catch (e) {
        return;
    }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = "./JSONs/" + files[i];

            var fileType = filePath.slice(filePath.length - 5, filePath.length);
            if (fileType == ".json" ||  fileType == ".JSON") {
                var fileName = "" + files[i];
                fileName = fileName.slice(0, fileName.length - 5);
                // console.log(fileName);
                // console.log(filePath);
                var graph = new graphJSON(filePath, fileName);
            }
        }
}