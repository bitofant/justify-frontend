
import { RouteConfig } from 'vue-router';
// const Home = () => import(/* webpackChunkName: "home" */ './views/Home.vue');
// const About = () => import(/* webpackChunkName: "home" */ './views/About.vue');
// const Error404 = () => import(/* webpackChunkName: "error404" */ './views/E404.vue');


interface MenuEntry extends RouteConfig {
	name: string;
	icon: string;
	hidden?: boolean;
	admin?: boolean;
}

const menu: MenuEntry[] = [
	{
		path: '/',
		alias: '/home',
		name: 'Startseite',
		icon: 'home',
		component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
	}, {
		path: '/parking',
		name: 'Parktickets',
		icon: 'drive_eta',
		component: () => import(/* webpackChunkName: "parking" */ './views/Parking.vue')
	}, {
		path: '/parking-chatbot',
		name: 'Parkticket Chatbot',
		icon: 'drive_eta',
		component: () => import(/* webpackChunkName: "parkingchatbot" */ './views/ParkingChatbot.vue')
	}, {
		path: '/login',
		name: 'Login',
		icon: 'account_circle',
		component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
	}, {
		path: '/about',
		name: 'About',
		icon: 'info',
		component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
	}, {
		path: '*',
		name: 'Error 404',
		icon: 'error',
		hidden: true,
		component: () => import(/* webpackChunkName: "error404" */ './views/E404.vue')
	}
];

// setInterval(() => menu[1].hidden = !menu[1].hidden, 500);

export default menu;
