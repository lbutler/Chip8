var CHIP8 = CHIP8 || {};

CHIP8.Keyboard = (function() {
	'use strict';

	var Keyboard = function Keyboard() {

		this.keyState = {
			"0": false,
			"1": false,
			"2": false,
			"3": false,
			"4": false,
			"5": false,
			"6": false,
			"7": false,
			"8": false,
			"9": false,
			"a": false,
			"b": false,
			"c": false,
			"d": false,
			"e": false,
			"f": false,
		};
		var self = this;
		window.addEventListener("keydown", function(){ self.pressKey(event, self); } , false);
		window.addEventListener("keyup", function(){ self.releaseKey(event, self); } , false);

	};

	Keyboard.prototype.convertKeyCode = function(keycode) {
		var keyState = {
			49: "0", // 1
			50: "1", // 2
			51: "2", // 3
			52: "3", // 4
			81: "4", // q
			87: "5", // w
			69: "6", // e
			82: "7", // r
			65: "8", // a
			83: "9", // s
			68: "a", // d
			70: "b", // f
			90: "c", // z
			88: "d", // x
			67: "e", // c
			86: "f", // v
		};
		return keyState[keycode];
	};

	Keyboard.prototype.pressKey = function(event, self) {
		var key = self.convertKeyCode(event.keyCode);
		if (key !== undefined)
			this.keyState[ key ] = true;
	};

	Keyboard.prototype.releaseKey = function(event, self) {
		var key = self.convertKeyCode(event.keyCode);
		if (key !== undefined)
			this.keyState[ key ] = false;
	};

	Keyboard.prototype.isKeyPressed = function(key) {

		return this.keyState[key];

	};

	Keyboard.prototype.waitForKeyPress = function(){
		var keyPressed = null;
		for(var key in this.keyState) {
			if(this.keyState[key] === true)
				keyPressed = key;
		}

		return keyPressed;

	};

	return Keyboard;

})();