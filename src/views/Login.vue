<style lang="scss" scoped>
	
</style>


<template>
	<v-container fluid fill-height style="background:#aaa">
		<v-layout align-center justify-center>
			<v-flex xs12 sm8 md4>
				<v-card class="elevation-12">
					<v-toolbar dark color="primary">
						<v-toolbar-title>Justify Login</v-toolbar-title>
						<v-spacer />
						<v-progress-circular
								indeterminate
								color="#fff"
								v-show="controlsDisabled"
								/>
					</v-toolbar>
					<v-card-text>
						<v-form>
							<v-text-field
									v-model="email"
									:disabled="controlsDisabled"
									prepend-icon="person"
									name="login"
									label="E-mail address"
									type="text"
									@keypress="kpress"
									ref="email"
									autocomplete="username"
									autofocus="autofocus"></v-text-field>
							<v-text-field
									v-model="passw"
									:disabled="controlsDisabled"
									prepend-icon="lock"
									name="password"
									label="Password"
									type="password"
									@keypress="kpress"
									autocomplete="current-password"
									id="password"></v-text-field>
							<v-checkbox
									v-model="stayLoggedin"
									label="Stay logged in (uses a cookie)"
									/>
						</v-form>
						<v-alert :value="!!loginError" type="error" dismissible>
							Unable to login: <span v-text="loginError" />
						</v-alert>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
								:disabled="controlsDisabled"
								color="secondary">Register</v-btn>
						<v-btn
								:disabled="controlsDisabled"
								color="primary" @click="login">Login</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>


<script lang="ts">
	import Vue from 'vue';
	import axios from 'axios';
	import { communication } from '../ts/communication';
	import transferred from '../ts/data-types/transferred';
	import bus from '../ts/bus';


	export default Vue.extend ({
		name: 'login',
		data () {
			return {
				email: '',
				passw: '',
				stayLoggedin: false,
				controlsDisabled: false,
				loginError: null
			};
		},
		methods: {
			kpress (ev: KeyboardEvent) {
				const c = ev.which || ev.charCode || ev.keyCode;
				if (c === 13) this.login();
			},
			login () {
				this.controlsDisabled = true;
				this.loginError = null;
				const cred: transferred.LoginCredentials = {
					mail: this.email,
					pass: this.passw,
					stayLoggedin: this.stayLoggedin
				};
				// saveCredentials(cred);
				communication.tryLogin (cred).then (user => {
					console.log('logged in as ' + user.name);
				}).catch (err => {
					this.controlsDisabled = false;
					window.requestAnimationFrame (() => {
						(this.$refs.email as HTMLElement).focus();
						const el = (this.$refs.email as Vue).$el.getElementsByTagName ('input')[0];
						el.selectionStart = 0;
						el.selectionEnd = this.email.length;
					});
					this.loginError = err.message ? err.message : err.toString ();
				});
			}
		},
		mounted () {
			bus.emit ('app:title', 'Login');
		}
	});
</script>
