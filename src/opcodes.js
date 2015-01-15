var CHIP8 = CHIP8 || {};

CHIP8.Opcodes = (function() {

	var Opcodes = function Opcodes() {};

	var NNN; //address
	var NN;  //8-bit constant
	var N;   //4-bit constant
	var X;   //4-bit register identifier
	var Y;   //4-bit register identifier

	// Opcodes
	_00E0 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [00E0] Clears the screen.' );
		this.clearScreen();
	};

	_00EE = function(opcode) {
		console.log( (opcode).toString(16) + ' - [00EE] Returns from a subroutine.' );
		this.pc = this.stack[this.sp - 1];
		this.sp--;
	};

	_1NNN = function(opcode) {
		console.log( (opcode).toString(16) + ' - [1NNN] Jumps to address NNN.' );
		this.pc = NNN;
	};

	_2NNN = function(opcode) {
		console.log( (opcode).toString(16) + ' - [2NNN] Calls subroutine at NNN.' );
		this.stack[this.sp] = this.pc;
		this.sp++;
		this.pc = NNN;
	};

	_3XNN = function(opcode) {
		console.log( (opcode).toString(16) + ' - [3XNN] Skips the next instruction if VX equals NN.' );
		if ( this.V[X] == NN )
			this.pc +=2;
	};

	_4XNN = function(opcode) {
		console.log( (opcode).toString(16) + ' - [4XNN] Skips the next instruction if VX doesnt equal NN.' );
		if ( this.V[X] != NN )
			this.pc +=2;
	};

	_5XY0 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [5XY0] Skips the next instruction if VX equals VY.' );
		if ( this.V[X] == this.V[Y] )
			this.pc +=2;
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
		this.V[X] = this.V[X] | this.V[Y];
	};

	_8XY2 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [8XY2] Sets VX to VX and VY.' );
		this.V[X] = this.V[X] & this.V[Y];
	};

	_8XY3 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [8XY3] Sets VX to VX xor VY.' );
		this.V[X] = this.V[X] ^ this.V[Y];
	};

	_8XY4 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [8XY4] Adds VY to VX. VF is set to 1 when theres a carry, and to 0 when there isnt.' );
		var temp = this.V[X] += this.V[Y];
		if (temp > 255) {
			this.V[0xF] = 1;
		} else {
			this.V[0xF] = 0;
		}
	};

	_8XY5 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [8XY5] VY is subtracted from VX. VF is set to 0 when theres a borrow, and 1 when there isnt.' );
		this.V[X] -= this.V[Y];
		if (temp > 0) {
			this.V[0xF] = 1;
		} else {
			this.V[0xF] = 0;
		}
	};

	_8XY6 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [8XY6] Shifts VX right by one. VF is set to the value of the least significant bit of VX before the shift.' );
		this.V[0xF] = this.V[Y] & 1;
		this.V[X] = this.V[Y] >> 1;
	};

	_8XY7 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [8XY7] Sets VX to VY minus VX. VF is set to 0 when theres a borrow, and 1 when there isnt.' );
		this.V[X] = this.V[Y] - this.V[X];
		if (temp > 0) {
			this.V[0xF] = 1;
		} else {
			this.V[0xF] = 0;
		}
	};

	_8XYE = function(opcode) {
		console.log( (opcode).toString(16) + ' - [8XYE] Shifts VX left by one. VF is set to the value of the most significant bit of VX before the shift.' );
		this.V[0xF] = this.V[Y] >> 7; //Everyone else seems to do this by AND'ing 128, lets see if I found out why shortly
		this.V[X] = this.V[Y] << 1;
	};

	_9XY0 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [9XY0] Skips the next instruction if VX doesnt equal VY.' );
		if ( this.V[X] != this.V[Y] )
			this.pc +=2;
	};

	_ANNN = function(opcode) {
		console.log( (opcode).toString(16) + ' - [ANNN] Sets I to the address NNN.' );
		this.I = NNN;
	};

	_BNNN = function(opcode) {
		console.log( (opcode).toString(16) + ' - [BNNN] Jumps to the address NNN plus V0.' );
		this.pc = NNN + this.V[0];
	};

	_CXNN = function(opcode) {
		console.log( (opcode).toString(16) + ' - [CXNN] Sets VX to a random number and NN.' );
		this.V[X] = Math.random()*0xFF & NN;
	};

	_DXYN = function(opcode) {
		console.log( (opcode).toString(16) + ' - [DXYN] Sprites stored in memory at location in index register (I), maximum 8bits wide. Wraps around the screen. If when drawn, clears a pixel, register VF is set to 1 otherwise it is zero. All drawing is XOR drawing (i.e. it toggles the screen pixels)' );
		
		this.V[0xf] = 0;

		var row, col, sprite;

		for (row = 0; row < N; row++) {
			sprite = this.memory[this.I + row];

			for (col = 0; col < 8; col++) {

				if((sprite & 0x80 )> 0) {
					if (this.setPixel(this.V[X] + col, this.V[Y] + row )) {
						this.V[0xf] = 1;
					}
				}
				
				sprite <<= 1;

			}
		}

	};

	_EX9E = function(opcode) {
		console.log( (opcode).toString(16) + ' - [EX9E] Skips the next instruction if the key stored in VX is pressed.' );
		if( this.keyboard.isKeyPressed(this.V[X]))
			this.pc += 2;
	};

	_EXA1 = function(opcode) {
		console.log( (opcode).toString(16) + ' - [EXA1] Skips the next instruction if the key stored in VX isnt pressed.' );
		if( this.keyboard.isKeyPressed(this.V[X]) ===  false)
			this.pc += 2;
	};

	_FX07 = function(opcode) {
		console.log( (opcode).toString(16) + ' - FX07] - Sets VX to the value of the delay timer.' );
		this.V[X] = this.delayTimer;
	};

	_FX0A = function(opcode) {
		console.log( (opcode).toString(16) + ' - FX0A] - A key press is awaited, and then stored in VX.' );
		var keyReturn = this.keyboard.waitForKeyPress();
		if (keyReturn !== null){
			this.V[X] = keyReturn;
			this.running = true;
		} else {
			this.pc -= 2;
			this.running = false;
		}
	};

	_FX15 = function(opcode) {
		console.log( (opcode).toString(16) + ' - FX15] - Sets the delay timer to VX.' );
		this.delayTimer = this.V[X];
	};

	_FX18 = function(opcode) {
		console.log( (opcode).toString(16) + ' - FX18] - Sets the sound timer to VX.' );
		this.soundTimer = this.V[X];
	};

	_FX1E = function(opcode) {
		console.log( (opcode).toString(16) + ' - FX1E] - Adds VX to I.' );
		this.I = this.I + this.V[X];
	};

	_FX29 = function(opcode) {
		console.log( (opcode).toString(16) + ' - FX29] - Sets I to the location of the sprite for the character in VX. Characters 0-F (in hexadecimal) are represented by a 4x5 font.' );
		this.I =  this.V[X] * 5;
	};

	_FX33 = function(opcode) {
		console.log( (opcode).toString(16) + ' - FX33] - Stores the Binary-coded decimal representation of VX, with the most significant of three digits at the address in I, the middle digit at I plus 1, and the least significant digit at I plus 2. (In other words, take the decimal representation of VX, place the hundreds digit in memory at location in I, the tens digit at location I+1, and the ones digit at location I+2.)' );
		this.memory[this.I]		= parseInt(this.V[X] / 100, 16);
		this.memory[this.I + 1]	= parseInt((this.V[X] / 10 % 10), 16);
		this.memory[this.I + 2]	= (this.V[X] % 100) % 10;
	};

	_FX55 = function(opcode) {
		console.log( (opcode).toString(16) + ' - FX55] - Stores V0 to VX in memory starting at address I' );
		for (var i = 0; i < 16; i++) {
			this.memory[this.I + i] = this.V[i];
		}
		
	};

	_FX65 = function(opcode) {
		console.log( (opcode).toString(16) + ' - FX65] - Fills V0 to VX with values from memory starting at address I.' );
		for (var i = 0; i < 16; i++) {
			this.V[i] = this.memory[this.I + i];
		}
	};



	// Opcode Lookup tables

	_0Table = function(opcode) {
		var _0opcodes = {
			'0': _00E0,
			'e': _00EE
		};

		return _0opcodes[(opcode & 0x000f).toString(16)];
	};

	_8Table = function(opcode) {
		var _8opcodes = {
			'0': _8XY0,
			'1': _8XY1,
			'2': _8XY2,
			'3': _8XY3,
			'4': _8XY4,
			'5': _8XY5,
			'6': _8XY6,
			'7': _8XY7,
			'e': _8XYE
		};

		return _8opcodes[(opcode & 0x000f).toString(16)];
	};

	_ETable = function(opcode) {

		var _Eopcodes = {
			'9': _EX9E,
			'a': _EXA1
		};

		return _Eopcodes[((opcode & 0x00f0)>>4).toString(16)];
	};
	
	_FTable = function(opcode) {

		var _Fopcodes = {
			'7': _FX07,
			'a': _FX0A,
			'15': _FX15,
			'18': _FX18,
			'1e': _FX1E,
			'29': _FX29,
			'33': _FX33,
			'55': _FX55,
			'65': _FX65
		};

		return _Fopcodes[(opcode & 0x00ff).toString(16)];
	};
	

	opcodeTable = function(opcode) {

		var opcodeTable = {
			"0": _0Table(opcode),
			"1": _1NNN,
			"2": _2NNN,
			"3": _3XNN,
			"4": _4XNN,
			"5": _5XY0,
			"6": _6XNN,
			"7": _7XNN,
			"8": _8Table(opcode),
			"9": _9XY0,
			"a": _ANNN,
			"b": _BNNN,
			"c": _CXNN,
			"d": _DXYN,
			"e": _ETable(opcode),
			"f": _FTable(opcode)
		};

		return opcodeTable[((opcode & 0xf000)>>12).toString(16)];
	};


	// Public Methods

	Opcodes.prototype.getOperation = function(opcode) {

		NNN = (opcode  & 0x0FFF);
		NN = (opcode & 0x00FF);
		N = (opcode & 0x000F);
		X = (opcode & 0x0F00) >> 8;
		Y = (opcode & 0x00F0) >> 4;

		return opcodeTable(opcode);
    };


	return Opcodes;

})();