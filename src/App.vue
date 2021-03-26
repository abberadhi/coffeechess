<template>
	<div id="app">
		<div class="container">
			<Chess />
		</div>
	</div>
</template>

<script>
import Chess from './components/Chess.vue'

export default {
	name: 'App',
	data() {
		return {
			isConnected: false
		}
	},
	components: {
		Chess
	},
	sockets: {
		/*
		 * 👂 Listen to socket events emitted from the socket server
		 */
		connect() {
			console.log('Connected to the socket server.')
			this.isConnected = true
		}
	}
}
</script>

<style>

</style>
