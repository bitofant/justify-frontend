<template>
	<div style="position:relative">
		<v-layout row wrap class="pb-1"
				:style="{ backgroundImage: 'linear-gradient(to bottom, rgba(25, 118, 210, ' + (Math.max(1-st/100,.9)) + '), #4C9BF6)' }">
				<!-- style="background-image: linear-gradient(to bottom, #1976D2, #4C9BF6)"
				:style="{ opacity: Math.max(1 - st / 150, .9) }"> -->

			<v-flex class="pa-2 " xs12 sm5 offset-sm1 md4 offset-md2 lg3 offset-lg3>
				<v-card class="elevation-5">
					<v-img :src="require('../assets/home/parking-small.jpg')" aspect-ratio="1.5" />
					<v-card-title primary-title>
						<div>
							<h3 class="headline mb-0">Parkticket bekommen?</h3>
							Erstelle in 3 Minuten ein Einspruchschreiben!
						</div>
					</v-card-title>
					<v-card-actions>
						<v-btn flat color="primary" @click="$router.push('parking')">Manuell</v-btn>
						<v-btn flat color="primary">Chatbot</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>

			<v-flex class="pa-2 " xs12 sm5 md4 lg3>
				<v-card class="elevation-5">
					<v-img :src="require('../assets/home/sth-else-small.jpg')" aspect-ratio="1.5" />
					<v-card-title primary-title>
						<div>
							<h3 class="headline mb-0">Du weißt nicht wie man unterschreibt?</h3>
							Na da können wir Dir auch nicht helfen :-(
						</div>
					</v-card-title>
					<v-card-actions>
						<v-btn flat color="primary" @click="alert('find ich auch')">Schade</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>

		</v-layout>

		<br />
		<v-divider />

		<v-container fluid v-scroll="onScroll">
			<v-layout row>
				<v-flex xs12 sm10 offset-sm1 md8 offest-md2 lg6 offset-lg3>
					<h1 style="text-align:Center">Willkommen bei Justify</h1>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis turpis sed dignissim dapibus. Mauris posuere mauris et sapien dapibus fringilla. Sed finibus mi at odio bibendum, nec porttitor ante ullamcorper. Sed euismod sit amet ante vel mollis. Sed in tortor tortor. Maecenas tristique facilisis ante, at semper metus tincidunt id. Mauris semper, mi vitae faucibus elementum, libero diam finibus eros, sed interdum justo nulla ac mauris. Aliquam porttitor pretium dolor a aliquet. Nunc elementum tincidunt erat et porttitor. Duis nec dui eu ligula convallis accumsan a nec dolor. Cras eu elit lectus. Praesent sed ultricies arcu, et imperdiet dolor. Integer tempor neque ut suscipit luctus. Nullam venenatis augue lorem, aliquet tincidunt velit condimentum eu. Quisque orci ligula, accumsan eu velit a, auctor hendrerit felis.
					Sed odio dui, sagittis sed urna finibus, euismod euismod sem. Quisque varius tincidunt est, in dignissim nisl lobortis quis. Etiam id tincidunt neque. Donec tincidunt sodales sollicitudin. In est mauris, hendrerit nec aliquet vitae, semper ut sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Pellentesque elementum tellus eget sapien iaculis vestibulum. Praesent auctor faucibus enim, sit amet cursus dolor placerat eget. Phasellus turpis elit, ultricies eget arcu non, volutpat accumsan nisl. Nunc commodo orci et neque faucibus, id efficitur justo commodo. Suspendisse feugiat augue lectus. Duis posuere massa ac sem efficitur, at blandit eros maximus. Sed porta congue erat, in fringilla ante laoreet quis. Phasellus nulla erat, ultrices eu augue sit amet, imperdiet elementum quam. Cras quis urna eget libero feugiat scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper tincidunt justo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi eget magna vel nunc interdum pretium ac non felis. Aliquam erat volutpat. Praesent convallis, ante et varius convallis, sem quam eleifend ipsum, sit amet malesuada nisl magna sit amet urna.
					Nunc euismod malesuada risus id ullamcorper. Curabitur et accumsan nunc. Duis dignissim dui in neque ultricies euismod. Aenean eget magna et elit tristique pharetra quis at massa. Aenean gravida augue massa, et malesuada magna lacinia at. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam sit amet tincidunt neque, vel venenatis eros. Aenean sed sodales lectus, in maximus ligula. Morbi varius ultricies nibh et vehicula. Nam congue dolor vel sollicitudin placerat. Donec malesuada malesuada dolor, at pharetra sapien faucibus at. Morbi tempus nec nulla id molestie. Vestibulum non turpis non odio scelerisque scelerisque. Proin ac lectus venenatis, mattis libero vitae, convallis leo. Etiam sollicitudin placerat magna, at ultricies arcu bibendum eget.
					Cras bibendum porta venenatis. Aenean mauris augue, condimentum sed dignissim ultrices, condimentum in mi. Quisque ac malesuada nulla. Donec varius sem sed varius volutpat. Quisque dictum tempor sapien. Etiam sodales hendrerit pulvinar. Nam ut nunc venenatis, vulputate massa quis, rhoncus neque. Quisque in efficitur diam, vel gravida libero. Pellentesque leo elit, tempor ut purus non, malesuada varius ante. Ut sed ligula risus. Vestibulum rutrum tellus ligula, facilisis congue nulla sodales quis. Proin eu felis a elit interdum interdum. Nam at est id dui ultrices iaculis. Nunc consectetur ipsum dignissim, molestie tellus sit amet, scelerisque massa. In a velit sit amet odio mattis vulputate sit amet quis odio. Donec a nibh lectus.
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import bus from '../ts/bus';

	export default Vue.extend({
		name: 'home',
		components: {
		},
		data () {
			return {
				st: window.scrollY
			};
		},
		methods: {
			alert (msg: string) {
				alert (msg);
			},
			onScroll (e: any) {
				this.st = window.scrollY;
			}
		},
		mounted () {
			bus.emit('app:title', 'Justify!');
		}
	});
</script>
