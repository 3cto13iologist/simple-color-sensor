var
	five = require('johnny-five')
	, leds
	, board
	, photo
	, state = 0
	, duty = 255
	, maxHue
	, green
	, blue
	, red
;

/** ~~~~~~~ ~~~ ~
 * Fade through the spectrum
 * with an RGB LED using the
 * magic of PWM!
 */

board = new five.Board();

board.on('ready', function() {

	red = new five.Led(9);
	blue = new five.Led(10);
	green = new five.Led(11);
	leds = [ red, green, blue ];

	function stepColor() {

		stateCheck();
		leds[state].brightness(duty);
		leds[(state + 1) % 3].brightness(255 - duty);
	};
	function stateCheck() {

		if(--duty > 0) {

			return false;
		}
		duty = 255;
		if(++state == 3) {

			state = 0;
		}
		return true;
	};

	setInterval(stepColor, 10)
});