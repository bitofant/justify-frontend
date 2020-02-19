<template>
	<v-container fluid v-scroll="onScroll">
		<div class="primary" style="position:absolute;top:0px;left:0px;width:100%" :style="{zIndex: st ? 0 : 10}">
			<div style="height: 550px; background-image: linear-gradient(to bottom, transparent, #4C9BF6)">
				
				<v-layout row style="">

					<v-flex class="pa-2 " xs12 sm5 offset-sm1 md4 offset-md2 lg3 offset-lg3>
						<v-card class="elevation-5">
							<v-img :src="require('../assets/home/parking.jpg')" aspect-ratio="1.5" />
							<v-card-title primary-title>
								<div>
									<h3 class="headline mb-0">Parkticket bekommen?</h3>
									Erstelle in 3 Minuten ein Einspruchschreiben! {{ st }}
								</div>
							</v-card-title>
							<v-card-actions>
								<v-btn flat color="primary">Manuell</v-btn>
								<v-btn flat color="primary">Chatbot</v-btn>
							</v-card-actions>
						</v-card>
					</v-flex>

					<v-flex class="pa-2 " xs12 sm5 md4 lg3>
						<v-card class="elevation-5">
							<v-img :src="require('../assets/home/sth-else.jpg')" aspect-ratio="1.5" />
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
			</div>
		</div>

		
		<div style="height:2000px">
		</div>
	</v-container>
</template>

<script lang="ts">
	import Vue from 'vue';

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
		}
	});
</script>
