<style lang="scss" scoped>
	.cbmessage {
		background: rgba(197, 250, 222, 0.4);
		border-radius: .6em;
		border: 1px solid rgba(0,0,0,.3);
	}
</style>

<template>
	<v-layout row wrap>
		<v-flex
				class="cbmessage elevation-1 pa-2 mb-2"
				v-for="(message, i) in messages"
				:key="i"
				xs9 :offset-xs3="message.side === 'right'">
			{{ message.text }}<br />
			{{ new Date(message.timestamp) }}
		</v-flex>
	</v-layout>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend ({
		name: 'message-list',
		props: [
			'messages'
		],
		data () {
			return {
			};
		},
		methods: {
		}
	});
</script>
