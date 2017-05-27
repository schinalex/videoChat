var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('error', function (err) {
	console.log('server error:\n',err.stack);
	server.close();
});

server.on('listening', function () {
	var address = server.address();
	console.log('server started at: ', address.address + ':' + address.port);
});

var canvas = document.querySelector('canvas');
canvas.height = 600;
canvas.width = 600;
var ctx = canvas.getContext('2d');
var video = document.querySelector('video.capture');
// var img = document.querySelector('img');
var cTime = new Date().valueOf();
var lTime = cTime;

var frameRateDiv = document.querySelector('div.frameRate');
var test = true;
var ret = {
	createFrames : function () {
		cTime = new Date().valueOf();
		frameRateDiv.innerText = "";
		frameRateDiv.append((
			(cTime - lTime)
		) + "");
		ctx.clearRect(0,0,1000,1000);
		ctx.drawImage(video,0,0);
		setTimeout(function () {
			lTime = cTime;
			ret.createFrames();
		}, 0);
	},
	init : function () {
		navigator.mediaDevices.getUserMedia({video : true, audio : true}).then(function (stream) {
			document.querySelector('video.capture').srcObject = stream;
		});
	}
};

module.exports = ret;
