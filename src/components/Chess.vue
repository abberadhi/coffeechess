<template>
    <canvas ref="canvas" width="800" height="800" style="border:1px solid #d3d3d3;">
    Your browser does not support the HTML canvas tag.</canvas>
</template>

<script>
export default {
	name: 'Chess',
	data() {
		return {
			
		}
	},
	methods: {
		/*
		 * 💥 Emit increment_counter event to the socket server.
		 */
		increment() {
			this.$socket.client.emit('increment_counter')
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
