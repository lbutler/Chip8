(function() {

	var pong = new Uint8Array([0x6A,0x02,0x6B,0x0C,0x6C,0x3F,0x6D,0x0C,0xA2,0xEA,0xDA,0xB6,0xDC,0xD6,0x6E,0x00,0x22,0xD4,0x66,0x03,0x68,0x02,0x60,0x60,0xF0,0x15,0xF0,0x07,0x30,0x00,0x12,0x1A,0xC7,0x17,0x77,0x08,0x69,0xFF,0xA2,0xF0,0xD6,0x71,0xA2,0xEA,0xDA,0xB6,0xDC,0xD6,0x60,0x01,0xE0,0xA1,0x7B,0xFE,0x60,0x04,0xE0,0xA1,0x7B,0x02,0x60,0x1F,0x8B,0x02,0xDA,0xB6,0x60,0x0C,0xE0,0xA1,0x7D,0xFE,0x60,0x0D,0xE0,0xA1,0x7D,0x02,0x60,0x1F,0x8D,0x02,0xDC,0xD6,0xA2,0xF0,0xD6,0x71,0x86,0x84,0x87,0x94,0x60,0x3F,0x86,0x02,0x61,0x1F,0x87,0x12,0x46,0x02,0x12,0x78,0x46,0x3F,0x12,0x82,0x47,0x1F,0x69,0xFF,0x47,0x00,0x69,0x01,0xD6,0x71,0x12,0x2A,0x68,0x02,0x63,0x01,0x80,0x70,0x80,0xB5,0x12,0x8A,0x68,0xFE,0x63,0x0A,0x80,0x70,0x80,0xD5,0x3F,0x01,0x12,0xA2,0x61,0x02,0x80,0x15,0x3F,0x01,0x12,0xBA,0x80,0x15,0x3F,0x01,0x12,0xC8,0x80,0x15,0x3F,0x01,0x12,0xC2,0x60,0x20,0xF0,0x18,0x22,0xD4,0x8E,0x34,0x22,0xD4,0x66,0x3E,0x33,0x01,0x66,0x03,0x68,0xFE,0x33,0x01,0x68,0x02,0x12,0x16,0x79,0xFF,0x49,0xFE,0x69,0xFF,0x12,0xC8,0x79,0x01,0x49,0x02,0x69,0x01,0x60,0x04,0xF0,0x18,0x76,0x01,0x46,0x40,0x76,0xFE,0x12,0x6C,0xA2,0xF2,0xFE,0x33,0xF2,0x65,0xF1,0x29,0x64,0x14,0x65,0x00,0xD4,0x55,0x74,0x15,0xF2,0x29,0xD4,0x55,0x00,0xEE,0x80,0x80,0x80,0x80,0x80,0x80,0x80,0x00,0x00,0x00,0x00,0x00]);
	var guess = new Uint8Array([0x6e,0x01,0x00,0xe0,0x6d,0x01,0x6a,0x01,0x6b,0x01,0x8c,0xd0,0x8c,0xe2,0x4c,0x00,0x12,0x20,0x88,0xd0,0x22,0x3e,0x3a,0x40,0x12,0x20,0x6a,0x01,0x7b,0x06,0x3c,0x3f,0x7d,0x01,0x3d,0x3f,0x12,0x0a,0xf0,0x0a,0x40,0x05,0x89,0xe4,0x8e,0xe4,0x3e,0x40,0x12,0x02,0x6a,0x1c,0x6b,0x0d,0x88,0x90,0x00,0xe0,0x22,0x3e,0x12,0x3c,0xa2,0x94,0xf8,0x33,0xf2,0x65,0x22,0x54,0xda,0xb5,0x7a,0x04,0x81,0x20,0x22,0x54,0xda,0xb5,0x7a,0x05,0x00,0xee,0x83,0x10,0x83,0x34,0x83,0x34,0x83,0x14,0xa2,0x62,0xf3,0x1e,0x00,0xee,0xe0,0xa0,0xa0,0xa0,0xe0,0x40,0x40,0x40,0x40,0x40,0xe0,0x20,0xe0,0x80,0xe0,0xe0,0x20,0xe0,0x20,0xe0,0xa0,0xa0,0xe0,0x20,0x20,0xe0,0x80,0xe0,0x20,0xe0,0xe0,0x80,0xe0,0xa0,0xe0,0xe0,0x20,0x20,0x20,0x20,0xe0,0xa0,0xe0,0xa0,0xe0,0xe0,0xa0,0xe0,0x20,0xe0]);
	var ibm = new Uint8Array([0x00,0xe0,0xa2,0x2a,0x60,0x0c,0x61,0x08,0xd0,0x1f,0x70,0x09,0xa2,0x39,0xd0,0x1f,0xa2,0x48,0x70,0x08,0xd0,0x1f,0x70,0x04,0xa2,0x57,0xd0,0x1f,0x70,0x08,0xa2,0x66,0xd0,0x1f,0x70,0x08,0xa2,0x75,0xd0,0x1f,0x12,0x28,0xff,0x00,0xff,0x00,0x3c,0x00,0x3c,0x00,0x3c,0x00,0x3c,0x00,0xff,0x00,0xff,0xff,0x00,0xff,0x00,0x38,0x00,0x3f,0x00,0x3f,0x00,0x38,0x00,0xff,0x00,0xff,0x80,0x00,0xe0,0x00,0xe0,0x00,0x80,0x00,0x80,0x00,0xe0,0x00,0xe0,0x00,0x80,0xf8,0x00,0xfc,0x00,0x3e,0x00,0x3f,0x00,0x3b,0x00,0x39,0x00,0xf8,0x00,0xf8,0x03,0x00,0x07,0x00,0x0f,0x00,0xbf,0x00,0xfb,0x00,0xf3,0x00,0xe3,0x00,0x43,0xe0,0x00,0xe0,0x00,0x80,0x00,0x80,0x00,0x80,0x00,0x80,0x00,0xe0,0x00,0xe0]);
	var maze = new Uint8Array([0xa2,0x1e,0xc2,0x01,0x32,0x01,0xa2,0x1a,0xd0,0x14,0x70,0x04,0x30,0x40,0x12,0x00,0x60,0x00,0x71,0x04,0x31,0x20,0x12,0x00,0x12,0x18,0x80,0x40,0x20,0x10,0x20,0x40,0x80,0x10]);
	var puzzle = new Uint8Array([0x00,0xe0,0x6c,0x00,0x4c,0x00,0x6e,0x0f,0xa2,0x03,0x60,0x20,0xf0,0x55,0x00,0xe0,0x22,0xbe,0x22,0x76,0x22,0x8e,0x22,0x5e,0x22,0x46,0x12,0x10,0x61,0x00,0x62,0x17,0x63,0x04,0x41,0x10,0x00,0xee,0xa2,0xe8,0xf1,0x1e,0xf0,0x65,0x40,0x00,0x12,0x34,0xf0,0x29,0xd2,0x35,0x71,0x01,0x72,0x05,0x64,0x03,0x84,0x12,0x34,0x00,0x12,0x22,0x62,0x17,0x73,0x06,0x12,0x22,0x64,0x03,0x84,0xe2,0x65,0x03,0x85,0xd2,0x94,0x50,0x00,0xee,0x44,0x03,0x00,0xee,0x64,0x01,0x84,0xe4,0x22,0xa6,0x12,0x46,0x64,0x03,0x84,0xe2,0x65,0x03,0x85,0xd2,0x94,0x50,0x00,0xee,0x44,0x00,0x00,0xee,0x64,0xff,0x84,0xe4,0x22,0xa6,0x12,0x5e,0x64,0x0c,0x84,0xe2,0x65,0x0c,0x85,0xd2,0x94,0x50,0x00,0xee,0x44,0x00,0x00,0xee,0x64,0xfc,0x84,0xe4,0x22,0xa6,0x12,0x76,0x64,0x0c,0x84,0xe2,0x65,0x0c,0x85,0xd2,0x94,0x50,0x00,0xee,0x44,0x0c,0x00,0xee,0x64,0x04,0x84,0xe4,0x22,0xa6,0x12,0x8e,0xa2,0xe8,0xf4,0x1e,0xf0,0x65,0xa2,0xe8,0xfe,0x1e,0xf0,0x55,0x60,0x00,0xa2,0xe8,0xf4,0x1e,0xf0,0x55,0x8e,0x40,0x00,0xee,0x3c,0x00,0x12,0xd2,0x22,0x1c,0x22,0xd8,0x22,0x1c,0xa2,0xf8,0xfd,0x1e,0xf0,0x65,0x8d,0x00,0x00,0xee,0x7c,0xff,0xcd,0x0f,0x00,0xee,0x7d,0x01,0x60,0x0f,0x8d,0x02,0xed,0x9e,0x12,0xd8,0xed,0xa1,0x12,0xe2,0x00,0xee,0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0a,0x0b,0x0c,0x0d,0x0e,0x0f,0x00,0x0d,0x00,0x01,0x02,0x04,0x05,0x06,0x08,0x09,0x0a,0x0c,0x0e,0x03,0x07,0x0b,0x0f,0x84,0xe4,0x22,0xa6,0x12,0x76,0x64,0x0c,0x84,0xe2,0x65,0x0c,0x85,0xd2,0x94,0x50,0x00,0xee,0x44,0x0c,0x00,0xee,0x64,0x04,0x84,0xe4,0x22,0xa6,0x12,0x8e,0xa2,0xe8,0xf4,0x1e,0xf0,0x65,0xa2,0xe8,0xfe,0x1e,0xf0,0x55,0x60,0x00,0xa2,0xe8,0xf4,0x1e,0xf0,0x55,0x8e,0x40,0x00,0xee,0x3c,0x00,0x12,0xd2,0x22,0x1c,0x22,0xd8,0x22,0x1c,0xa2,0xf8,0xfd,0x1e,0xf0,0x65,0x8d,0x00,0x00,0xee,0x7c,0xff,0xcd,0x0f,0x00,0xee,0x7d,0x01,0x60,0x0f,0x8d,0x02,0xed,0x9e,0x12,0xd8,0xed,0xa1,0x12,0xe2,0x00,0xee,0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0a,0x0b,0x0c,0x0d,0x0e,0x0f,0x00,0x0d,0x00,0x01,0x02,0x04,0x05,0x06,0x08]);

	var emulator =  new CHIP8.Cpu();
	emulator.opcodes = new CHIP8.Opcodes();
	emulator.video = new CHIP8.CanvasScreen(emulator.gfx);

	console.log(emulator);

	emulator.loadProgram(guess);

	var dumpMemoryArray = function(memoryItem, target) {
		var div = document.getElementById(target);
		div.innerHTML = '';
		for(var i = 0; i < memoryItem.length; i++){
			div.innerHTML = div.innerHTML + '<span><b>' + i.toString(16) + '</b>:' + memoryItem[i] + ' |</span> ';
		}
	};

	var dumpMemoryItem = function(memoryItem, target) {
		var div = document.getElementById(target);
		div.innerHTML = memoryItem;

	};

	var cycleButton = document.getElementById('emulate-cycle');
	cycleButton.onclick = function() {
		emulator.emulateCycle();
		dumpMemoryArray(emulator.V,'debug-V');
		dumpMemoryItem(emulator.I, 'debug-I' );
		dumpMemoryItem(emulator.pc, 'debug-pc' );
		dumpMemoryItem(emulator.sp, 'debug-sp' );
		dumpMemoryArray(emulator.stack,'debug-stack');
	};

	var drawButton = document.getElementById('draw-screen');
	drawButton.onclick = function() { emulator.video.draw(); };

	var intervalButton = document.getElementById('interval-cycle');
	intervalButton.onclick = function() { setInterval(function(){ emulator.emulateCycle(); }, 100);};

})();