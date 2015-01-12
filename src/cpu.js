var CHIP8 = CHIP8 || {};

CHIP8.Cpu = (function() {

	var Cpu = {};

	Cpu.pc = 0x200;
	Cpu.stack = new Array(16);
	Cpu.sp = 0;
	Cpu.V = new Uint8Array(16);
	Cpu.I = 0;
	Cpu.memory = new Uint8Array(4096);

	Cpu.displayWidth = 64;
	Cpu.displayHeight = 32;
	Cpu.gfx = new Array(Cpu.displayWidth * Cpu.displayHeight);

	Cpu.drawFlag = false;

	Cpu.delayTimer = 0;
	Cpu.soundTimer = 0;

	var keys = {};

	Cpu.opcodes = { getOperation: function(opcode) {} };



	Cpu.loadProgram = function(program) {
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
		if(this.delayTimer > 0)
			--this.delayTimer;

		if(this.soundTimer > 0)
		{
			if(this.soundTimer === 1)
				console.log("BEEP"); //Todo make sound object
			--this.soundTimer;
		}
			
		
    };



	return Cpu;

})();