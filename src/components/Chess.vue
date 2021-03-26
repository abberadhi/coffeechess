<template>
    <canvas ref="canvas" width="800" height="800" style="border:1px solid #d3d3d3;">
    Your browser does not support the HTML canvas tag.</canvas>
</template>

<script>
export default {
	name: 'Chess',
	data() {
		return {
			// Chess board colors, should be flexible, add support for more colors later
			colors: ["#8CE78C", "#FFFFFF"],
			squareSize: null,
			ctx: null
		}
	},
	mounted() {
		this.ctx = this.$refs.canvas.getContext("2d");
		this.squareSize = this.$refs.canvas.width / 8;
		this.drawBoard();
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
