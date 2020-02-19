<template>
	<v-container>
		<v-layout row justify-center>
			<v-flex xs12 md10 lg8>
				<v-card class="elevation-3">
					<v-card-title>
						<h3>Park-Ticket</h3>
					</v-card-title>
					<v-card-text style="position:relative">
						<parking-form v-if="!didSend" @submit="submit" />
						<div v-else-if="success">
							<v-alert :value="true" type="success">
								Deine Daten wurden gesendet :-)
							</v-alert>
							<pre v-text="message" />
						</div>
						<div v-else>
							<v-alert :value="true" type="error">
								Deine Daten konnten nicht gesendet werden :-(
							</v-alert>
							<pre v-text="message" />
						</div>
						<div v-if="sending" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; background: rgba(230,230,230,.4); text-align: center; vertical-align: middle">
							<v-progress-circular indeterminate size="70" width="7" color="primary" style="position:relative;top:40%" />
						</div>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
	import Vue from 'vue';
	import bus from '../ts/bus';
	import ParkingForm, { ParkingFormData } from '../components/ParkingForm.vue';

	export default Vue.extend({
		name: 'parking',
		components: {
			ParkingForm
		},
		data () {
			return {
				sending: false,
				didSend: false,
				success: true,
				message: ''
			};
		},
		methods: {
			submit (data: ParkingFormData) {
				this.sending = true;
				this.didSend = false;
				setTimeout (() => {
					this.sending = false;
					this.success = Math.random () < .5;
					this.message = JSON.stringify (data, null, 4);
					this.didSend = true;
				}, 1500);
			}
		},
		mounted () {
			bus.emit('app:title', 'Park-Ticket');
		}
	});
</script>
