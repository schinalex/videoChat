
module.exports = (function (video) {
	var dgram = require('dgram');
	var socket = dgram.createSocket('udp4');

	var app = {};
	var timer = null;
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	app.startCron = function () {
		if (!timer) {
			timer = setInterval(function () {
				app.getFrame().then(function (base64Data) {
					socket.send(base64Data, 41111, '10,1,0,222', function (err) {
						if (err) {
							console.warn(err);
						}
						console.log('succesfuly sent');
					});
				});
			}, 33);
		}
	};

	app.getFrame = function () {
		new Promise(function(resolve, reject) {
			ctx.clearRect(0,0,800,800);
			ctx.drawImage(video,0,0);
			resolve(canvas.toDataURL());
		});
	};

	app.stopCron = function () {
		clearInterval(timer);
		timer = false;
	};


	return app;
})(video);
