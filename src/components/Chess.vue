<template>
    <canvas 
	@click="canvasClick"
	ref="canvas" width="800" height="800" style="border:1px solid #d3d3d3;">
    Your browser does not support the HTML canvas tag.</canvas>
</template>

<script>
import Chess from '../game/Chess.js';

export default {
	name: 'Chess',
	data() {
		return {
			// Chess board colors, should be flexible, add support for more colors later
			colors: ["#8CE78C", "#F8F8F8"],
			squareSize: null,
			ctx: null,
			game: null
		}
	},

	created() {
	},

	mounted() {
		this.init();
	},

	methods: {
		/*
		 * 💥 Emit increment_counter event to the socket server.
		 */
		increment() {
			this.$socket.client.emit('increment_counter')
		},

		init() {
			this.game = new Chess();
			this.ctx = this.$refs.canvas.getContext("2d");
			this.squareSize = this.$refs.canvas.width / 8;

			this.game.createStartPieces()
			this.drawBoard();
			this.drawPieces();

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
			for (let i = 0; i < gamePieces.length; i++) {
				gamePieces[i].base_image.onload = (function() {
					this.ctx.drawImage(
						gamePieces[i].base_image, 
						gamePieces[i].posX*this.squareSize, 
						gamePieces[i].posY*this.squareSize,
						this.squareSize,
						this.squareSize
					);
				}).bind(this);

				this.ctx.drawImage(
					gamePieces[i].base_image, 
					gamePieces[i].posX*this.squareSize, 
					gamePieces[i].posY*this.squareSize,
					this.squareSize,
					this.squareSize
				);
			}
			// this.drawPieces();
		},

		reDraw() {
			this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
			this.drawBoard();
			this.drawPieces();
		},

		/**
		 * Handles click events for the Canvas.
		 * @param event event click
		 */
		canvasClick(event) {
			let sX = Math.floor(event.clientX / this.squareSize);
			let sY = Math.floor(event.clientY / this.squareSize);



			// first click
			if (!this.game.selected) {
				let piece = this.game.getPieceBySquare(sX, sY).piece;1
				if (!piece) return; // return if undefined
				if (piece.side != this.game.turn) return; // return if wrong side
				this.game.selected = piece;
				this.highlightSquare(this.game.selected);
			} else {
				// if piece is selected
				this.game.initiateMove(this.game.selected, sX, sY);
				this.highlightSquare(this.game.selected);
				this.game.selected = null;
				this.reDraw();
			}
		},

		/**
		 * Highlights square
		 */
		highlightSquare(piece) {
			let moves = piece.allPossibleMoves(this.game.getAllPieces());

			// loop through possible moves and highlight the squares
			for(let i = 0; i < moves.length; i++) {
				this.ctx.beginPath();
				if (moves[i].take) {
					this.ctx.strokeStyle = "red";
					
				} else {
					this.ctx.strokeStyle = "green";
					this.ctx.lineWidth = 5 / 2;
				}

				this.ctx.rect(moves[i].x*this.squareSize, moves[i].y*this.squareSize, this.squareSize, this.squareSize);
				this.ctx.stroke();
			}

			this.ctx.beginPath();
			this.ctx.strokeStyle = "gray";
			this.ctx.rect(piece.posX*this.squareSize, piece.posY*this.squareSize, this.squareSize, this.squareSize);
			this.ctx.stroke();


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
