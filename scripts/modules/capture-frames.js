
module.exports = function (video) {
	var dgram = require('dgram');
	var socket = dgram.createSocket('udp4');

	var app = {};
	var timer = null;
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var finalCtx = document.getElementById('canvas').getContext('2d');
	app.startCron = function () {
		if (!timer) {
			// timer = setInterval(function () {
				app.getFrame().then(function (base64Data) {
					return new Promise(function(resolve, reject) {
						var id = parseInt((Math.random()*10000)+10000);
						for (var i = 0; i <= base64Data.length; i += 512) {
							socket.send(JSON.stfinalCtxringify({
								id : id,
								part : i/512,
								length : Math.ceil(base64Data.length / 512),
								data : base64Data
							}), 41111, '10.1.0.222', function (err) {
								if (err) {
									console.warn(err);
								} else {
									console.log('succesfuly sent');
								}
							});
						}
					});
				});
			// }, 1000);
		}
	};

	app.setFrame = function (frame) {
		var img = document.createElement('img');
		ctx.clearRect(0,0,800,800);
		img.onload = function () {
			finalCtx.drawImage(img, 0, 0);
		};
		img.src = frame;
	};

	app.getFrame = function () {
		return new Promise(function(resolve, reject) {
			ctx.clearRect(0,0,800,800);
			ctx.drawImage(video,0,0);
			resolve(canvas.toDataURL());
		});
	};

	app.stopCron = function () {
		clearInterval(timer);
		timer = false;
	};

	App.captureFrames = app;
	return app;
};
