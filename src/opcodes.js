var CHIP8 = CHIP8 || {};

CHIP8.Opcodes = (function() {

	var Opcodes = function Opcodes() {};

	var NNN; //address
	var NN;  //8-bit constant
	var N;   //4-bit constant
	var X;   //4-bit register identifier
	var Y;   //4-bit register identifier


	// Opcodes

	opERR = function(opcode) {
		throw new Error("Unknown opcode " + opcode.toString(16));
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
		this.V[X] = NN;
	};

	_7XNN = function(opcode) {
		console.log( (opcode).toString(16) + ' - [7XNN] Adds NN to VX.' );
		this.V[X] += NN;
	};

	_8XY0 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [8XY0] Sets VX to the value of VY.' );
		this.V[X] = this.V[Y];
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
		this.V[X] += this.V[X];
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

	_FX07 = function(opcode) {
		console.log( (opcode).toString(16) + ' - FX07] - Sets VX to the value of the delay timer.' );
	};

	_FX0A = function(opcode) {
		console.log( (opcode).toString(16) + ' - FX0A] - A key press is awaited, and then stored in VX.' );
	};

	_FX15 = function(opcode) {
		console.log( (opcode).toString(16) + ' - FX15] - Sets the delay timer to VX.' );
	};

	_FX18 = function(opcode) {
		console.log( (opcode).toString(16) + ' - FX18] - Sets the sound timer to VX.' );
	};

	_FX1E = function(opcode) {
		console.log( (opcode).toString(16) + ' - FX1E] - Adds VX to I.' );
	};

	_FX29 = function(opcode) {
		console.log( (opcode).toString(16) + ' - FX29] - Sets I to the location of the sprite for the character in VX. Characters 0-F (in hexadecimal) are represented by a 4x5 font.' );
	};

	_FX33 = function(opcode) {
		console.log( (opcode).toString(16) + ' - FX33] - Stores the Binary-coded decimal representation of VX, with the most significant of three digits at the address in I, the middle digit at I plus 1, and the least significant digit at I plus 2. (In other words, take the decimal representation of VX, place the hundreds digit in memory at location in I, the tens digit at location I+1, and the ones digit at location I+2.)' );
	};

	_FX55 = function(opcode) {
		console.log( (opcode).toString(16) + ' - FX55] - Stores V0 to VX in memory starting at address I' );
	};

	_FX65 = function(opcode) {
		console.log( (opcode).toString(16) + ' - FX65] - Fills V0 to VX with values from memory starting at address I.' );
	};



	// Opcode Lookup tables

	_0Table = function(opcode) {
		var _0opcodes = [
			_00E0,
			opERR, opERR, opERR, opERR, opERR, opERR, opERR,opERR,opERR, opERR, opERR, opERR, opERR,
			_00EE,
			opERR
		];

		_0opcodes[(opcode & 0x000f)](opcode);
	};

	_8Table = function(opcode) {
		var _8opcodes = [
			_8XY0, _8XY1, _8XY2, _8XY3, _8XY4, _8XY5, _8XY6, _8XY7,
			opERR, opERR, opERR, opERR, opERR, opERR, _8XYE, opERR
		];

		_8opcodes[(opcode & 0x000f)](opcode);
	};

	_ETable = function(opcode) {
		var _Eopcodes = [
			opERR, opERR, opERR, opERR, opERR, opERR, opERR, opERR,	opERR,
			_EX9E,
			_EXA1,
			opERR, opERR, opERR, opERR, opERR
		];

		_Eopcodes[(opcode & 0x00f0)>>4](opcode);
	};
	
	_FTable = function(opcode) {

		var _Fopcodes = {
			'7': _FX07,
			'A': _FX0A,
			'15': _FX15,
			'18': _FX18,
			'1E': _FX1E,
			'29': _FX29,
			'33': _FX33,
			'55': _FX55,
			'65': _FX65
		};

		_Fopcodes[(opcode & 0x00ff).toString(16)](opcode);
	};
	
	var opcodeTable = [
		_0Table, _1NNN,	_2NNN, _3XNN, _4XNN, _5XY0, _6XNN, _7XNN,
		_8Table, _9XY0, _ANNN, _BNNN, _CXNN, _DXYN, _ETable, _FTable
	];


	// Public Methods

	Opcodes.prototype.getOperation = function(opcode) {

		NNN = (opcode  & 0x0FFF);
		NN = (opcode & 0x00FF);
		N = (opcode & 0x000F);
		X = (opcode & 0x0F00) >> 8;
		Y = (opcode & 0x00F0) >> 4;

		return opcodeTable[(opcode & 0xf000)>>12];
    };


	return Opcodes;

})();