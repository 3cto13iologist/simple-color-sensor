var
	five = require('johnny-five')
	, leds
	, board
	, photo 		// photo resistor
	, state = 0 	// current color (0 = r, 1 = g, 2 = b)
	, duty = 255	// current duty cycle
	, maxPhotoValue = 0 // highest photo resistor value
	, maxHue = [ ]	// color values at time of highest photo resistor value
	, timer			// loop
	, red
	, green
	, blue
	, idle	// boolean: is the sensor taking a reading?
	, arr = ["red"];
	;

board = new five.Board();

board.on('ready', function() {
	red = new five.Led(9);
	blue = new five.Led(10);
	green = new five.Led(11);
	leds = [ red, green, blue ];

	photo = new five.Sensor({
		pin : "A0"
		, freq : 200
	});

	photo.on('read', function(err, dat) {
		if(err) { return console.log(">>> Read error: %s", err); }
		//console.log("Raw value: %s, normalized: %s", dat, this.normalized);
	});

	function stepColor() {
		stateCheck();
		colorCheck();
		leds[state].brightness(duty);
		leds[(state + 1) % 3].brightness(255 - duty);
	};

	function stateCheck() {
		if(--duty > 0) {
			return false;
		}
		duty = 255;
		if(++state == 3) {
			// done with scan
			state = 0;
			console.log(">>> %s", rgbToHex(maxHue));
			//removed goIdle function
		}
		return true;
	};
	setInterval (stepColor, 10)

	function colorCheck() {
		if(photo.value > maxPhotoValue) {
			maxPhotoValue = photo.value;
			maxHue = [
				red.value
				, green.value
				, blue.value
			];
		}
	};

	function componentToHex(c) {
		if(c == null){    //added null statement to avoid errors
			return;
		}
    	var hex = c.toString(16);
    	return hex.length == 1 ? "0" + hex : hex;
	};

	function rgbToHex(vals) {

    	return [
    		"#"
    		, componentToHex(vals[0])
    		, componentToHex(vals[1])
    		, componentToHex(vals[2])
    	].join('');
	};
});
