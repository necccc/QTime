// Import the interface to Tessel hardware

//var tessel = require('tessel');


var config = require('./config');

var finish = function () {
	config.read(function (e, data) {
		console.log(data)
	});
}



var callback = function (e, data) {

	if (e) throw e;

	data.qtime.network.mode = "client";

	config.write(data, function (err) {
		if (e) throw e;

		console.log('ok')

		finish()
	})
}

config.read(callback);
