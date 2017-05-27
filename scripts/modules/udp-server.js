(function () {
	var app = {};
	var dgram = require('dgram');
	var socket = dgram.createSocket('udp4');

	socket.bind(41111);

	socket.on('error', function (err) {
		console.log('server error:\n',err.stack);
		server.close();
	});

	socket.on('listening', function () {
		var address = socket.address();
		console.log('server started at: ', address.address + ':' + address.port);
	});

	socket.on('message', function (base64Data) {
		console.log('recieved buffer data');
	});

	return app;
})();
