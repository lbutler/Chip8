var CHIP8 = CHIP8 || {};

CHIP8.Cpu = (function() {

	var Cpu = {};

	Cpu.pc = 0x200;
	Cpu.stack = new Array(16);
	Cpu.sp = 0;
	Cpu.V = new Uint8Array(16);
	Cpu.I = 0;
	Cpu.memory = new Uint8Array(4096);
	Cpu.running = false;

	Cpu.displayWidth = 64;
	Cpu.displayHeight = 32;
	Cpu.gfx = new Array(Cpu.displayWidth * Cpu.displayHeight);

	Cpu.drawFlag = false;

	Cpu.delayTimer = 0;
	Cpu.soundTimer = 0;

	var keys = {};

	Cpu.opcodes = { getOperation: function(opcode) {} };
	Cpu.keyboard = { isKeyPressed: function(key) {}, waitForKeyPress: function(){ return null;} };

	var loadFonts = function() {
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
			Cpu.memory[i] = fonts[i];
		}
	};

	Cpu.loadProgram = function(program) {

		loadFonts();
			
		for (var i = 0, length = program.length; i < length; i++) {
			this.memory[0x200 + i] = program[i];
		}
	};

	Cpu.emulateCycle = function() {
		//Grab opcode
		var opcode = this.memory[this.pc] << 8 | this.memory[this.pc + 1];
		this.pc += 2;

		//Find and then run opcode function
		var opcodeFunc = this.opcodes.getOperation(opcode).bind(Cpu);
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