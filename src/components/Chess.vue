<template>
    <canvas ref="canvas" width="800" height="800" style="border:1px solid #d3d3d3;">
    Your browser does not support the HTML canvas tag.</canvas>
</template>

<script>
import Chess from '../game/Chess.js';

export default {
	name: 'Chess',
	data() {
		return {
			// Chess board colors, should be flexible, add support for more colors later
			colors: ["#8CE78C", "#FFFFFF"],
			squareSize: null,
			ctx: null,
			game: null
		}
	},
	created() {

	},
	mounted() {
		// this below should be a separate init() function
		this.ctx = this.$refs.canvas.getContext("2d");
		this.squareSize = this.$refs.canvas.width / 8;
		this.game = new Chess();
		this.game.createStartPieces()
		this.drawBoard();
		// setTimeout(this.drawPieces, 100)
		this.drawPieces();
	},
	methods: {
		/*
		 * 💥 Emit increment_counter event to the socket server.
		 */
		increment() {
			this.$socket.client.emit('increment_counter')
		},

		/**
		 * Draws chess board.
		 */
		drawBoard() {
			let alternator = 0;

			for (let x = 0; x < 8; x++) {
				for (let y = 0; y < 8; y++) {
					this.ctx.fillStyle = this.colors[alternator];
					alternator = (alternator == 0 ? 1 : 0);
					
					this.ctx.fillRect(x*this.squareSize, y*this.squareSize, this.squareSize, this.squareSize);
				}
				alternator = (alternator == 0 ? 1 : 0);
			}
		},

		/**
		 * Draw pieces
		 */
		drawPieces() {
			let gamePieces = this.game.getAllPieces();

			/**
			 * FIX THIS
			 * error on line 70, this.ctx is undefined
			 * solve with promise mby
			 */
			for (let i = 0; i < gamePieces.length; i++) {
				gamePieces[i].base_image.onload = function() {
					this.ctx.drawImage(
						gamePieces[i].base_image, 
						(gamePieces[i].posX*this.squareSize), 
						gamePieces[i].posY*this.squareSize,
						100,
						100
					);
				}
				
				this.ctx.drawImage(
					gamePieces[i].base_image, 
					(gamePieces[i].posX*this.squareSize) + (gamePieces[i].base_image.naturalHeight/2/2/2/2), 
					gamePieces[i].posY*this.squareSize + (gamePieces[i].base_image.naturalWidth/2/2/2/2),
					gamePieces[i].base_image.naturalWidth*1.5,
					gamePieces[i].base_image.naturalHeight*1.5,
				);
			}
		}
	},

	sockets: {
		/*
		 * 👂 Listen to socket events emitted from the socket server
		 */
		update_counter(value) {
			this.value = value
		}
	}
}
</script>

<style scoped>
</style>
