// This is the server-side app to make a simple node/socket.io server   
// It initializes socket.io and a new express instance.
// Start it by running 'node app.js' from your terminal.

// Creating an express server

var express = require('express'),
	app = express();

// This is needed if the app is run on heroku and other cloud providers:
var port = process.env.PORT || 8080;

// Initialize a new socket.io object. It is bound to 
// the express app, which allows them to coexist.
var io = require('socket.io').listen(app.listen(port));


// App Configuration

// Make the files in the public folder available to the world
app.use(express.static(__dirname + '/public'));

// This is a secret key that prevents others from opening your presentation
// and controlling it. Change it to something that only you know.

var secret = 'q';

// Initialize a new socket.io application

var sockapp = io.on('connection', function (socket) {

	// A new client has come online. 
	socket.on('load', function(data){

	});
    socket.on('step', function(step){
        console.log('message: ' + JSON.stringify(step));
        socket.broadcast.emit('step', step);
  });
});




console.log('Running on http://localhost:' + port);

// print network IP of server, for smartphone link...
var os = require('os');
var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

console.log('Network IP: ' + addresses[0]);

// create QR code of IP... or make this static adress when hosted...
var qr = require('qr-image');  
var fs = require('fs');

var code = qr.image('http://:'.concat(addresses[0],':8080'), { type: 'png' });  
var output = fs.createWriteStream('public/img/server_ip_qr.png')

code.pipe(output);  
