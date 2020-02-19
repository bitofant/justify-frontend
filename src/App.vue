<style lang="scss" scoped>
	
</style>


<template>
	<div id="app">
		<!-- <login v-if="!appState.loggedIn" /> -->
		<!-- <v-app v-else id="justify" :dark="darkTheme"> -->
		<v-app id="justify" :dark="darkTheme">
			<v-navigation-drawer
					v-model="drawer"
					fixed
					app>
				<v-list dense>
					<v-list-tile
							v-for="item in menu"
							v-show="!item.hidden"
							:key="item.path"
							@click="navigate (item.path)">
						<v-list-tile-action>
							<v-icon v-text="item.icon" />
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title v-text="item.name" :style="($route && item.name === $route.name) ? 'font-weight:bold;color:#06c' : ''" />
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
			</v-navigation-drawer>
			<v-toolbar
					color="primary"
					ref="titlebar"
					dark fixed app>
				<v-toolbar-side-icon @click.stop="drawer = !drawer" />
				<v-toolbar-title v-text="title" />
			</v-toolbar>
			<v-content>
				<router-view />
			</v-content>
			<!-- <v-footer color="secondary" ref="footer" dark app>
				<div class="flex text-xs-center">
					&copy; <span v-text="new Date().getFullYear()" /> Justify GmbH
				</div>
			</v-footer> -->
		</v-app>
		<div style="position: fixed; bottom: 0px; right: 0px; z-index:999">
			<chat ref="chat" />
		</div>
	</div>
</template>


<script lang="ts">
	import Vue from 'vue';
	import menu from './menu';
	import VueRouter from 'vue-router';
	import VuetifyConfig from './plugins/vuetify';
	import bus from './ts/bus';
	import Chat from './components/Chat.vue';
	import Login from './views/Login.vue';
	import appState from './ts/app-state';

	Vue.use (VueRouter);

	export default Vue.extend ({
		name: 'app',
		router: new VueRouter ({ routes: menu }),
		components: {
			Login,
			Chat
		},
		data () {
			return {
				title: 'Justify!',
				drawer: false,
				menu,
				darkTheme: VuetifyConfig.darkTheme,
				appState
			};
		},
		methods: {
			// getRouteTitle () {
			// 	if (this.$route && this.$route.name) return this.$route.name;
			// 	console.log ('Unable to find route name for ', this.$route);
			// 	return 'Route name undefined';
			// },
			navigate (to: string) {
				this.$router.push (to);
			},
			recalcInnerHeight () {
				const titlebarHeight = ((this.$refs.titlebar as Vue).$el as HTMLElement).offsetHeight;
				// const footerHeight = ((this.$refs.footer as Vue).$el as HTMLElement).offsetHeight;
				const height = window.innerHeight - titlebarHeight;
				bus.emit ('app:height', height);
			},
			updateAppTitle (title: string) {
				this.title = title;
			}
		},
		created () {
			bus.on('app:title', this.updateAppTitle);
			window.addEventListener ('resize', this.recalcInnerHeight, false);
		},
		mounted () {
			this.recalcInnerHeight ();
			// console.log ((this.$refs.chat as Vue).$el);
		},
		beforeDestroy () {
			bus.removeListener ('app:title', this.updateAppTitle);
			window.removeEventListener ('resize', this.recalcInnerHeight);
		}
	});
</script>
