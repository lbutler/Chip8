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


	opCodeErr = function(opcode) {
		throw new Error("Unknow opcode " + opcode.toString(16));
	};

	_00E0 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [00E0] Clears the screen.' );
	};

	_00EE = function(opcode) {
		console.log( (opcode).toString(16) + ' - [00EE] Returns from a subroutine.' );
	};

	_1NNN = function(opcode) {
		console.log( (opcode).toString(16) + ' - [1NNN] Jumps to address NNN.' );
	};

	_2NNN = function(opcode) {
		console.log( (opcode).toString(16) + ' - [2NNN] Calls subroutine at NNN.' );
	};

	_3XNN = function(opcode) {
		console.log( (opcode).toString(16) + ' - [3XNN] Skips the next instruction if VX equals NN.' );
	};

	_4XNN = function(opcode) {
		console.log( (opcode).toString(16) + ' - [4XNN] Skips the next instruction if VX doesnt equal NN.' );
	};

	_5XY0 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [5XY0] Skips the next instruction if VX equals VY.' );
	};

	_6XNN = function(opcode) {
		console.log( (opcode).toString(16) + ' - [6XNN] Sets VX to NN.' );
	};

	_7XNN = function(opcode) {
		console.log( (opcode).toString(16) + ' - [7XNN] Adds NN to VX.' );
	};

	_8XY0 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [8XY0] Sets VX to the value of VY.' );
	};

	_8XY1 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [8XY1] Sets VX to VX or VY.' );
	};

	_8XY2 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [8XY2] Sets VX to VX and VY.' );
	};

	_8XY3 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [8XY3] Sets VX to VX xor VY.' );
	};

	_8XY4 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [8XY4] Adds VY to VX. VF is set to 1 when theres a carry, and to 0 when there isnt.' );
	};

	_8XY5 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [8XY5] VY is subtracted from VX. VF is set to 0 when theres a borrow, and 1 when there isnt.' );
	};

	_8XY6 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [8XY6] Shifts VX right by one. VF is set to the value of the least significant bit of VX before the shift.' );
	};

	_8XY7 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [8XY7] Sets VX to VY minus VX. VF is set to 0 when theres a borrow, and 1 when there isnt.' );
	};

	_8XYE = function(opcode) {
		console.log( (opcode).toString(16) + ' - [8XYE] Shifts VX left by one. VF is set to the value of the most significant bit of VX before the shift.' );
	};

	_9XY0 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [9XY0] Skips the next instruction if VX doesnt equal VY.' );
	};

	_ANNN = function(opcode) {
		console.log( (opcode).toString(16) + ' - [ANNN] Sets I to the address NNN.' );
	};

	_BNNN = function(opcode) {
		console.log( (opcode).toString(16) + ' - [BNNN] Jumps to the address NNN plus V0.' );
	};

	_CXNN = function(opcode) {
		console.log( (opcode).toString(16) + ' - [CXNN] Sets VX to a random number and NN.' );
	};

	_DXYN = function(opcode) {
		console.log( (opcode).toString(16) + ' - [DXYN] Sprites stored in memory at location in index register (I), maximum 8bits wide. Wraps around the screen. If when drawn, clears a pixel, register VF is set to 1 otherwise it is zero. All drawing is XOR drawing (i.e. it toggles the screen pixels)' );
	};

	_EX9E = function(opcode) {
		console.log( (opcode).toString(16) + ' - [EX9E] Skips the next instruction if the key stored in VX is pressed.' );
	};

	_EXA1 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [EXA1] Skips the next instruction if the key stored in VX isnt pressed.' );
	};

	//	TODO:
	//	Add support for ETable Function Pointer

	//	TODO:
	//	Add support for FTable Function Pointer

	var _0Table = [
		_00E0,
		opCodeErr, opCodeErr, opCodeErr, opCodeErr, opCodeErr, opCodeErr, opCodeErr,opCodeErr,opCodeErr, opCodeErr, opCodeErr, opCodeErr, opCodeErr,
		_00EE,
		opCodeErr
	];

	var _8Table = [
		_8XY0,
		_8XY1,
		_8XY2,
		_8XY3,
		_8XY4,
		_8XY5,
		_8XY6,
		_8XY7,
		opCodeErr, opCodeErr, opCodeErr, opCodeErr, opCodeErr, opCodeErr,
		_8XYE,
		opCodeErr
	];

	var _ETable = [
		opCodeErr, opCodeErr, opCodeErr, opCodeErr, opCodeErr, opCodeErr, opCodeErr, opCodeErr,	opCodeErr,
		_EX9E,
		_EXA1,
		opCodeErr, opCodeErr, opCodeErr, opCodeErr, opCodeErr
	];

	_FTable = function(opcode) {
		console.log( (opcode).toString(16) + ' - Lookup FTable' );
	};
	

	var opcodeTable = [
		_0Table,
		_1NNN,
		_2NNN,
		_3XNN,
		_4XNN,
		_5XY0,
		_6XNN,
		_7XNN,
		_8Table,
		_9XY0,
		_ANNN,
		_BNNN,
		_CXNN,
		_DXYN,
		_ETable,
		_FTable
	];




	Cpu.loadProgram = function(program) {
      for (var i = 0, length = program.length; i < length; i++) {
        memory[0x200 + i] = program[i];
      }
    };

    Cpu.emulateCycle = function() {
		var opcode = memory[pc] << 8 | memory[pc + 1];

		opcodeTable[(opcode & 0xf000)>>12](opcode);

		pc += 2;
    };



	return Cpu;

})();