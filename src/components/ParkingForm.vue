<style lang="scss" scoped>
	
</style>

<template>
	<v-form v-model="valid" @submit="submit">

		<v-text-field ref="email"
				class="mb-2"
				v-model="email"
				:rules="rules.email"
				label="E-Mail Adresse"
				@keypress="keypress"
				:disabled="disabled"
				autocomplete="email"
				required autofocus />
		
		<v-text-field ref="name"
				class="mb-2"
				v-model="name"
				:rules="rules.name"
				label="Beschuldigter"
				@keypress="keypress"
				:disabled="disabled"
				autocomplete="name"
				required />

		<v-text-field ref="street"
				class="mb-2"
				v-model="street"
				:rules="rules.street"
				label="Straße und Hausnummer"
				@keypress="keypress"
				:disabled="disabled"
				autocomplete="address-line1"
				required />

		<v-text-field ref="city"
				class="mb-2"
				v-model="city"
				:rules="rules.city"
				label="Plz und Ort"
				@keypress="keypress"
				:disabled="disabled"
				autocomplete="address-line3"
				required />

		<div style="text-align: right">
			<v-btn class="primary" :disabled="disabled" @click="submit">Abschicken</v-btn>
		</div>

	</v-form>
</template>

<script lang="ts">
	import Vue from 'vue';

	interface ParkingFormData {
		email: string;
		name: string;
		street: {
			name: string;
			number: string;
		};
		city: {
			zip: string;
			name: string;
		};
	}
	export { ParkingFormData };

	export default Vue.extend ({
		name: 'parking-form',
		props: {
			disabled: {
				type: Boolean,
				required: false
			}
		},
		data () {
			return {
				valid: false,
				rules: {
					email: [
						(v: string) => !!v || 'Pflichtfeld',
						(v: string) => /.+@.+\..+/.test(v) || 'Ungültige E-Mail-Adresse'
					],
					name: [
						// (v: string) => v.length <= 10 || 'Name must be less than 10 characters',
						(v: string) => v.length > 1 || 'Pflichtfeld',
						(v: string) => /.+\s.+/.test(v) || 'Nachname fehlt'
					],
					street: [
						(v: string) => v.length > 1 || 'Pflichtfeld',
						(v: string) => /.+\s\d+/.test(v) || 'Unvollständige Adresse'
					],
					city: [
						(v: string) => v.length > 1 || 'Pflichtfeld',
						(v: string) => /^\s*\d{5}\s.+/.test(v) || 'Unvollständige Adresse'
					]
				},
				name: '',
				email: '',
				street: '',
				city: ''
			};
		},
		methods: {
			submit () {
				if (this.validateForm()) {
					// trim whitespaces from all variables
					this.email = this.email.trim();
					this.name = this.name.trim();
					this.street = this.street.trim();
					this.city = this.city.trim();
					const streetNumber = this.street.split (' ').pop () || '';
					const streetName = this.street.substr (0, this.street.length - streetNumber.length - 1);
					const exportedData: ParkingFormData = {
						email: this.email,
						name: this.name,
						street: {
							name: streetName,
							number: streetNumber
						},
						city: {
							zip: this.city.substr (0, 5),
							name: this.city.substr (6)
						}
					};
					this.$emit ('submit', exportedData);
				}
			},
			keypress (event: KeyboardEvent) {
				if ([10, 13].indexOf(event.which || event.keyCode) < 0) return;
				const target = event.target || event.srcElement;
				const fields = Object.keys (this.rules) as Array<'email'|'name'|'street'|'city'>;

				const t = fields.find (n => (this.$refs[n] as Vue).$refs.input === target) || null;
				if (t === null) return;

				if (!this.validate (t)) return;

				const tnext = Object.keys (this.rules)[
					fields.indexOf (t) + 1
				] as 'email'|'name'|'street'|'city'|undefined || null ;
				if (tnext !== null) {
					(this.$refs[tnext] as HTMLElement).focus();
				} else {
					this.submit ();
				}

			},
			validate (which: 'email'|'name'|'street'|'city'): boolean {
				let isValid = true;
				this.rules[which].forEach ((rule: (v: string) => true|string) => {
					if (rule (this[which]) !== true) {
						isValid = false;
					}
				});
				return isValid;
			},
			validateForm (): boolean {
				return !Object.keys(this.rules).find (k => !this.validate(k as 'email'));
			}
		}
	});
</script>
