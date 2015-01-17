var CHIP8 = CHIP8 || {};

CHIP8.CanvasScreen = (function() {

	var scale = 10;
	var canvas;
	var gfx;

	var displayWidth = 64;
	var displayHeight = 32;

	var CanvasScreen = function CanvasScreen(pixelData) {
		gfx = pixelData;
	};


	CanvasScreen.prototype.clearScreen = function() {

		canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);


	};


	CanvasScreen.prototype.draw = function() {

		canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgb(0,0,0)";

        var gfxPosition = 0;
		for (var y = 0; y < displayHeight; y++) {
			for (var x = 0; x < displayWidth; x++) {
				if(gfx[gfxPosition] === 1)
					ctx.fillRect (x * scale, y * scale, scale, scale);
				gfxPosition++;
			}
		}
        


	};


	return CanvasScreen;

})();