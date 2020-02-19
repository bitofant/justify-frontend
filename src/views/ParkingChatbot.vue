<style lang="scss" scoped>
	
</style>


<template>
	<v-layout row justify-center>
		<v-flex xs12 md10 lg8>
			<chatbot :height="appState.height" />
		</v-flex>
	</v-layout>
</template>


<script lang="ts">
	import Vue from 'vue';
	import Chatbot from '../components/Chatbot.vue';
	import bus from '../ts/bus';
	import appState from '../ts/app-state';
	
	export default Vue.extend ({
		name: 'parking-chatbot',
		components: {
			Chatbot
		},
		data () {
			return {
				appState
			};
		},
		methods: {
		},
		mounted () {
			bus.emit ('app:title', 'Chatbot: Parkticket');
		}
	});
</script>
