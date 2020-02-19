import Vue from 'vue';
import transitions from 'vuetify/es5/components/transitions';
import VApp from 'vuetify/es5/components/VApp';
import VBtn from 'vuetify/es5/components/VBtn';
import VFooter from 'vuetify/es5/components/VFooter';
import VGrid from 'vuetify/es5/components/VGrid';
import VIcon from 'vuetify/es5/components/VIcon';
import VList from 'vuetify/es5/components/VList';
import VNavigationDrawer from 'vuetify/es5/components/VNavigationDrawer';
import VToolbar from 'vuetify/es5/components/VToolbar';
import Vuetify from 'vuetify/es5/components/Vuetify';
import 'vuetify/src/stylus/app.styl';

const VuetifyConfig = {
	components: {
		VApp,
		VNavigationDrawer,
		VFooter,
		VList,
		VBtn,
		VIcon,
		VGrid,
		VToolbar,
		transitions,
	},
	iconfont: 'md',
	theme: {
		primary: '#1976D2',
		secondary: '#424242',
		accent: '#82B1FF',
		error: '#FF5252',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FFC107'
	},
	darkTheme: false
};
Vue.use(Vuetify, VuetifyConfig);
export default VuetifyConfig;
