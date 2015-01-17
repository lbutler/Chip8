var CHIP8 = CHIP8 || {};

CHIP8.Cpu = (function() {
	'use strict';

	var Cpu = function Cpu() {

		this.pc = 0x200;
		this.stack = new Array(16);
		this.sp = 0;
		this.V = new Uint8Array(16);
		this.I = 0;
		this.memory = new Uint8Array(4096);
		this.running = true;

		this.displayWidth = 64;
		this.displayHeight = 32;
		this.gfx = new Array(this.displayWidth * this.displayHeight);

		this.drawFlag = false;

		this.delayTimer = 0;
		this.soundTimer = 0;

		var keys = {};

		this.opcodes = { getOperation: function(opcode) {} };
		this.inputDevice = { isKeyPressed: function(key) {}, waitForKeyPress: function(){ return null;} };
		this.video = { draw: function() {} };


	};

	Cpu.prototype.loadFonts = function() {
		var fonts = [
			0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
			0x20, 0x60, 0x20, 0x20, 0x70, // 1
			0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
			0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
			0x90, 0x90, 0xF0, 0x10, 0x10, // 4
			0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
			0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
			0xF0, 0x10, 0x20, 0x40, 0x40, // 7
			0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
			0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
			0xF0, 0x90, 0xF0, 0x90, 0x90, // A
			0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
			0xF0, 0x80, 0x80, 0x80, 0xF0, // C
			0xE0, 0x90, 0x90, 0x90, 0xE0, // D
			0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
			0xF0, 0x80, 0xF0, 0x80, 0x80  // F
		];

		for (var i = 0, length = fonts.length; i < length; i++) {
			this.memory[i] = fonts[i];
		}
	};



	Cpu.prototype.setPixel = function(x, y) {

		if (x > this.displayWidth) {
			x -= this.displayWidth;
		} else if (x < 0) {
			x += this.displayWidth;
		}

		if (y > this.displayHeight) {
			y -= this.displayHeight;
		} else if (y < 0) {
			y += this.displayHeight;
		}

		var location = x + (y * this.displayWidth);

		this.gfx[location] ^= 1;

		return !this.gfx[location];

	};

	Cpu.prototype.loadProgram = function(program) {

		this.loadFonts();
			
		for (var i = 0, length = program.length; i < length; i++) {
			this.memory[0x200 + i] = program[i];
		}
	};

	Cpu.prototype.emulateCycle = function() {
		//Grab opcode
		var opcode = this.memory[this.pc] << 8 | this.memory[this.pc + 1];
		this.pc += 2;

		//Find and then run opcode function
		var opcodeFunc = this.opcodes.getOperation(opcode).bind(this);
		opcodeFunc(opcode);

		//Update timers
		if(this.delayTimer > 0 && this.running)
			--this.delayTimer;

		if(this.soundTimer > 0 && this.running)
		{
			if(this.soundTimer === 1)
				console.log("BEEP"); //Todo make sound object
			--this.soundTimer;
		}
			
		
    };

	return Cpu;

})();