var CHIP8 = CHIP8 || {};

CHIP8.Cpu = (function() {

	var Cpu = {};

	var pc = 0x200;
	var stack = new Array(16);
	var sp = 0;
	var v = new Uint8Array(16);
	var i = 0;
	var memory = new Uint8Array(4096);

	var displayWidth = 64;
	var displayHeight = 32;
	var gfx = new Array(displayWidth * displayHeight);

	var drawFlag = false;

	var delayTimer = 0;
	var soundTimer = 0;

	var keys = {};

	Cpu.opcodes = { getProcess: function(opcode) {} };



	Cpu.loadProgram = function(program) {
      for (var i = 0, length = program.length; i < length; i++) {
        memory[0x200 + i] = program[i];
      }
    };

    Cpu.emulateCycle = function() {
		var opcode = memory[pc] << 8 | memory[pc + 1];

		var opcodeFunc = Cpu.opcodes.getProcess(opcode).bind(Cpu);
		opcodeFunc(opcode);

		//opcodeTable[(opcode & 0xf000)>>12](opcode);

		pc += 2;
    };



	return Cpu;

})();