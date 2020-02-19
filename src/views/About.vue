<template>
	<div class="about">
		<h1>This is an about page</h1>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import bus from '../ts/bus';
	
	export default Vue.extend({
		data () {
			return {};
		},
		mounted () {
			bus.emit('app:title', 'Über uns');
		}
	});
</script>
