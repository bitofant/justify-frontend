<style lang="scss" scoped>
	
</style>

<template>
	<v-card class="elevation-3">
		<!-- <v-card-title>
			<h3>Chatbot</h3>
		</v-card-title> -->
		<v-card-text class="scroll-y" :style="{ height: (height - cardActionHeight) + 'px' }">
			<message-list :messages="messages" />
		</v-card-text>
		<v-card-actions ref="cardActions">
			<v-toolbar>
				<v-text-field
						v-model="message"
						:append-outer-icon="message ? 'send' : null"
						@click:append-outer="sendMessage"
						@keypress="msgKeyPress"
						label="Text" />
			</v-toolbar>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
	import Vue from 'vue';
	import bus from '../ts/bus';
	import MessageList from './MessageList.vue';

	export default Vue.extend ({
		name: 'chatbot',
		props: [
			'value',
			'disabled',
			'height'
		],
		components: {
			MessageList
		},
		data () {
			return {
				message: '',
				messages: [] as Array<{
					side: 'left'|'right',
					text: string,
					timestamp: number
				}>,
				insub: 140,
				cardActionHeight: 0
			};
		},
		methods: {
			changed () {
				// this.$emit ('input', this.$refs.txt.value)
			},
			sendMessage () {
				this.messages.push ({
					side: Math.random () < .5 ? 'left' : 'right',
					text: this.message,
					timestamp: Date.now ()
				});
				this.message = '';
			},
			recalcCardActionHeight () {
				this.cardActionHeight = (this.$refs.cardActions as HTMLElement).offsetHeight;
			},
			msgKeyPress (event: KeyboardEvent) {
				const key = event.keyCode || event.which;
				if (key !== 10 && key !== 13) return;
				if (!this.message) return;
				this.sendMessage ();
			}
		},
		mounted () {
			this.recalcCardActionHeight ();
			bus.on ('app:height', this.recalcCardActionHeight);
		},
		beforeDestroy () {
			bus.removeListener ('app:height', this.recalcCardActionHeight);
		}
	});
</script>
