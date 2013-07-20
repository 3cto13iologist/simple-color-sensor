var
	five = require('johnny-five')
	, board
	, photo
;

board = new five.Board();

/** ~~~~~~~ ~~~ ~
 * Initialize a photoresistor as a sensor
 * and simply output its readings to the console
 */

board.on('ready', function() {

	photo = new five.Sensor({

		pin : "A0"
		, freq : 200

	});

	photo.on('read', function(err, dat) {

		if(err) { return console.log(">>> Read error: %s", err); }

		console.log("Raw value: %s, normalized: %s", dat, this.normalized);
	});
});