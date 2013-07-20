var
	five = require('johnny-five')
	, chuck
	, board
	, photo
	, green
	, blue
	, red
;

board = new five.Board();

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