<style lang="scss" scoped>
	
</style>


<template>
	<div>
		<beautiful-chat
				:participants="participants"
				:titleImageUrl="titleImageUrl"
				:onMessageWasSent="onMessageWasSent"
				:messageList="messageList"
				:newMessagesCount="newMessagesCount"
				:isOpen="isChatOpen"
				:close="closeChat"
				:icons="icons"
				:open="openChat"
				:showEmoji="true"
				:showFile="true"
				:showTypingIndicator="showTypingIndicator"
				:colors="colors"
				:alwaysScrollToBottom="alwaysScrollToBottom"
				:messageStyling="messageStyling"
				@onType="handleOnType" />
	</div>
</template>


<script lang="ts">
	import Vue from 'vue';
	import Chat from 'vue-beautiful-chat';
	import CloseIcon from 'vue-beautiful-chat/src/assets/close-icon.png';
	import OpenIcon from 'vue-beautiful-chat/src/assets/logo-no-bg.svg';
	import FileIcon from 'vue-beautiful-chat/src/assets/file.svg';
	import CloseIconSvg from 'vue-beautiful-chat/src/assets/close.svg';
	import transferred from '../ts/data-types/transferred';
	import communication from '../ts/communication';
	import appState from '../ts/app-state';
	import bus from '../ts/bus';
	Vue.use (Chat);

	export default Vue.extend ({
		name: 'chat',
		components: {
			Chat
		},
		data () {
			return {
				icons: {
					open: { img: OpenIcon, name: 'default' },
					close: { img: CloseIcon, name: 'default' },
					file: { img: FileIcon, name: 'default' },
					closeSvg: { img: CloseIconSvg, name: 'default' },
				},
				participants: [
					{
						id: 'bot',
						name: 'Chatbot',
						imageUrl: require ('../assets/marlin.jpg')
						// 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4'
					}
				], // the list of all the participant of the conversation. `name` is the user name, `id` is used to
				// establish the author of a message, `imageUrl` is supposed to be the user avatar.
				titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
				messageList: appState.chatLog.slice (),
				newMessagesCount: 0,
				isChatOpen: false, // to determine whether the chat window should be open or closed
				showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator
				// for the specific user
				colors: {
					header: {
						bg: '#1976D2', text: '#ffffff' },
					launcher: {
						bg: '#1976D2' },
					messageList: {
						bg: '#ffffff' },
					sentMessage: {
						bg: '#4e8cff', text: '#ffffff' },
					receivedMessage: {
						bg: '#eaeaea', text: '#222222' },
					userInput: {
						bg: '#f4f7f9', text: '#565867' }
				}, // specifies the color scheme for the component
				alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in
				// (new message, user starts typing...)
				messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
			};
		},
		methods: {
			sendMessage (msg: transferred.BCMessage) {
				let delay = 750;
				if (!this.isChatOpen) {
					this.newMessagesCount++;
					delay = 1;
				} else {
					this.showTypingIndicator = 'bot';
				}
				setTimeout (() => {
					this.messageList.push (msg);
					this.showTypingIndicator = '';
				}, delay);
			},
			// sendMessage (text: string) {
			// 	if (text.length > 0) {
			// 		this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1;
			// 		this.onMessageWasSent({ author: 'support', type: 'text', data: { text } });
			// 	}
			// },
			onMessageWasSent (message: transferred.BCMessage) {
				// called when the user sends a message
				this.messageList.push (message);
				communication.sendChatMessage (message);
			},
			openChat () {
				// called when the user clicks on the fab button to open the chat
				this.isChatOpen = true;
				this.newMessagesCount = 0;
				setTimeout (() => {
					this.$el.children[0].children[1].classList.add ('elevation-5');
				}, 50);
				if (this.messageList.length === 0) {
					setTimeout (() => {
						this.showTypingIndicator = 'bot';
						setTimeout (() => {
							this.showTypingIndicator = '';
							this.messageList.push ({
								type: 'text',
								author: 'bot',
								data: {
									text: 'Hi, wie kann ich Dir helfen?'
								},
								suggestions: [
									'Was ist justify?',
									'Habe ein Parkticket erhalten'
								]
							});
						}, 2000);
					}, 400);
				}
			},
			closeChat () {
				// called when the user clicks on the botton to close the chat
				this.isChatOpen = false;
				this.showTypingIndicator = '';
			},
			handleScrollToTop () {
				// called when the user scrolls message list to top
				// leverage pagination for loading another page of messages
			},
			handleOnType () {
				console.log('Emit typing event');
			}
		},
		mounted () {
			bus.on ('chat:msg', this.sendMessage);
		},
		beforeDestroy () {
			bus.removeListener ('chat:msg', this.sendMessage);
		}
	});
</script>
