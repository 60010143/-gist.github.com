var net = require('net');
var sockets = [];
var port = 8000;
var guestId = 0;



var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var  fs = require('fs')
var  dataTime = []

var file = fs.readFileSync('time.json')
	var time = JSON.parse(file)

app.get('/', (req, res) => {
	res.send('Hello World')
	res.sendFile(__dirname + '/index.html');
	
	
	console.log (time[0].dataTime)
	dataTime = time[0].dataTime
	res.send(200)
})
const time = require('./time')

app.get('/time', (req, res) => {
	res.json(time)
	
})

io.on('connection', function(socket){
	socket.on('SEND_MESSAGE', function(msg){

	});
	function tick(){
		
			var d = new Date()
			var x = 0
			var h = d.getHours()
			var m = d.getMinutes()
			var x = (h*60)+m
			console.log(x)
			io.emit('MESSAGE',dataTime[parseInt(x)%dataTime.length]);
	}
	setInterval(tick, 30000);
});

http.listen(8888, function(){
  console.log('listening on web application *:8888');
});


var server = net.createServer(function(socket) {
	// Increment
	guestId++;
	socket.nickname = "Guest" + guestId;
	var clientName = socket.nickname;
	sockets.push(socket);
	// Log it to the server output
	console.log(clientName + ' joined this chat.');
	// Welcome user to the socket
	socket.write("Welcome to telnet chat!\n");
	// Broadcast to others excluding this socket
	broadcast(clientName, clientName + ' joined this chat.\n');
	// When client sends data
    
        socket.on('data', function(data) {
				var d1 = new Date()
				var x1 = 0
				var h1 = d1.getHours()
				var m1 = d1.getMinutes()
				var x1 = (h1*60)+m1
				var senddata = parseInt(dataTime[parseInt(x1)])
				var input = senddata.toString()
        var message = clientName + '  accept require > ' + input ;
				if (data.includes("update"))
				{
					var vlist = data.toString().split(" ")
					seth = parseInt(vlist[1]) 
					setm = parseInt(vlist[2])
					newdata = parseInt(vlist[3])

					var setx = (seth*60)+setm
					dataTime[setx] = newdata
					console.log(vlist)
					console.log(dataTime[setx])
					console.log(dataTime)
				}
				broadcast(clientName, message);
		// Log it to the server output
		process.stdout.write(message);
	}); 
	// When client leaves
	socket.on('end', function() {
		var message = clientName + ' left this chat\n';
		// Log it to the server output
		process.stdout.write(message);
		// Remove client from socket array
		removeSocket(socket);
		// Notify all clients
		broadcast(clientName, message);
	});

	// When socket gets errors
	socket.on('error', function(error) {
		console.log('Socket got problems: ', error.message);
	});
});

// Broadcast to others, excluding the sender
function broadcast(from, message) {
	// If there are no sockets, then don't broadcast any messages
	if (sockets.length === 0) {
		process.stdout.write('Everyone left the chat');
		return;
	}
	// If there are clients remaining then broadcast message
	sockets.forEach(function(socket, index, array){
		// Dont send any messages to the sender
		socket.write(message);
	});
};

// Remove disconnected client from sockets array
function removeSocket(socket) {

	sockets.splice(sockets.indexOf(socket), 1);

};

// Listening for any problems with the server
server.on('error', function(error) {

	console.log("So we got problems!", error.message);

});
// Listen for a port to telnet to
// then in the terminal just run 'telnet localhost [port]'
server.listen(port, function() {

	console.log("Server listening at http://localhost:" + port);

});