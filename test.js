module.exports = function () {
	var express = require("express");

	var app = express();

	app.get('/', function (req, res) {
		var div = document.createElement('div');
		div.iinerText = 'someone connected';
		document.querySelector('body').appendChild(div);
		res.send('fak uoi');
	});

	app.listen(3000, function () {
 		console.log('Example app listening on port 3000!');
	});
};
