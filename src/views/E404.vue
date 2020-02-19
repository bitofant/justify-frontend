<style lang="scss" scoped>
	
</style>


<template>
	<v-container>
		<h1>Error 404</h1>
		We are terribly sorry, but the requested page could not be found.
	</v-container>
</template>


<script lang="ts">
	import Vue from 'vue';
	import bus from '../ts/bus';
	
	export default Vue.extend ({
		name: 'error404',
		data () {
			return {
			};
		},
		methods: {
		},
		mounted () {
			bus.emit('app:title', `Page not found (#404${this.$route.path})`);
		}
	});
</script>
