
module.exports = (function () {
	var app = {};
	app.initCamera = function () {
		navigator.mediaDevices.getUserMedia({video : true, audio : true}).then(function (stream) {
			App.myStream = stream;
			document.querySelector('video.capture').srcObject = stream;
		});
	};
	app.initCamera();

	return app;
})();
