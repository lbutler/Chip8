(function() {

	var pong = new Uint8Array([0x6A,0x02,0x6B,0x0C,0x6C,0x3F,0x6D,0x0C,0xA2,0xEA,0xDA,0xB6,0xDC,0xD6,0x6E,0x00,0x22,0xD4,0x66,0x03,0x68,0x02,0x60,0x60,0xF0,0x15,0xF0,0x07,0x30,0x00,0x12,0x1A,0xC7,0x17,0x77,0x08,0x69,0xFF,0xA2,0xF0,0xD6,0x71,0xA2,0xEA,0xDA,0xB6,0xDC,0xD6,0x60,0x01,0xE0,0xA1,0x7B,0xFE,0x60,0x04,0xE0,0xA1,0x7B,0x02,0x60,0x1F,0x8B,0x02,0xDA,0xB6,0x60,0x0C,0xE0,0xA1,0x7D,0xFE,0x60,0x0D,0xE0,0xA1,0x7D,0x02,0x60,0x1F,0x8D,0x02,0xDC,0xD6,0xA2,0xF0,0xD6,0x71,0x86,0x84,0x87,0x94,0x60,0x3F,0x86,0x02,0x61,0x1F,0x87,0x12,0x46,0x02,0x12,0x78,0x46,0x3F,0x12,0x82,0x47,0x1F,0x69,0xFF,0x47,0x00,0x69,0x01,0xD6,0x71,0x12,0x2A,0x68,0x02,0x63,0x01,0x80,0x70,0x80,0xB5,0x12,0x8A,0x68,0xFE,0x63,0x0A,0x80,0x70,0x80,0xD5,0x3F,0x01,0x12,0xA2,0x61,0x02,0x80,0x15,0x3F,0x01,0x12,0xBA,0x80,0x15,0x3F,0x01,0x12,0xC8,0x80,0x15,0x3F,0x01,0x12,0xC2,0x60,0x20,0xF0,0x18,0x22,0xD4,0x8E,0x34,0x22,0xD4,0x66,0x3E,0x33,0x01,0x66,0x03,0x68,0xFE,0x33,0x01,0x68,0x02,0x12,0x16,0x79,0xFF,0x49,0xFE,0x69,0xFF,0x12,0xC8,0x79,0x01,0x49,0x02,0x69,0x01,0x60,0x04,0xF0,0x18,0x76,0x01,0x46,0x40,0x76,0xFE,0x12,0x6C,0xA2,0xF2,0xFE,0x33,0xF2,0x65,0xF1,0x29,0x64,0x14,0x65,0x00,0xD4,0x55,0x74,0x15,0xF2,0x29,0xD4,0x55,0x00,0xEE,0x80,0x80,0x80,0x80,0x80,0x80,0x80,0x00,0x00,0x00,0x00,0x00]);
	var guess = new Uint8Array([0x6e,0x01,0x00,0xe0,0x6d,0x01,0x6a,0x01,0x6b,0x01,0x8c,0xd0,0x8ce2,0x4c,0x00,0x12,0x20,0x88,0xd0,0x22,0x3e,0x3a,0x40,0x12,0x20,0x6a,0x01,0x7b06,0x3c,0x3f,0x7d,0x01,0x3d,0x3f,0x12,0x0a,0xf0,0x0a,0x40,0x05,0x89,0xe4,0x8ee4,0x3e,0x40,0x12,0x02,0x6a,0x1c,0x6b,0x0d,0x88,0x90,0x00,0xe0,0x22,0x3e,0x123c,0xa2,0x94,0xf8,0x33,0xf2,0x65,0x22,0x54,0xda,0xb5,0x7a,0x04,0x81,0x20,0x2254,0xda,0xb5,0x7a,0x05,0x00,0xee,0x83,0x10,0x83,0x34,0x83,0x34,0x83,0x14,0xa262,0xf3,0x1e,0x00,0xee,0xe0,0xa0,0xa0,0xa0,0xe0,0x40,0x40,0x40,0x40,0x40,0xe020,0xe0,0x80,0xe0,0xe0,0x20,0xe0,0x20,0xe0,0xa0,0xa0,0xe0,0x20,0x20,0xe0,0x80e0,0x20,0xe0,0xe0,0x80,0xe0,0xa0,0xe0,0xe0,0x20,0x20,0x20,0x20,0xe0,0xa0,0xe0a0,0xe0,0xe0,0xa0,0xe0,0x20,0xe0]);
	CHIP8.Cpu.opcodes = new CHIP8.Opcodes();

	CHIP8.Cpu.loadProgram(guess);

	console.log(CHIP8.Cpu);

	var cycleButton = document.getElementById('emulate-cycle');
	cycleButton.onclick = function() { CHIP8.Cpu.emulateCycle(); };
})();