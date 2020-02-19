import bus from './bus';
import communication from './communication';
import transferred from '../ts/data-types/transferred';

const LOCAL_STORAGE_PREFIX = 'jf-';

const appState = {
	height: 0,
	loggedIn: false,
	tryingTokenLogin: true,
	sessionToken: null as string|null,
	user: null as null|transferred.User,
	chatLog: [] as transferred.BCMessage[]
};

bus.on ('app:height', height => appState.height = height);

bus.on ('login:success', user => {
	appState.user = user;
	appState.loggedIn = true;
});


bus.on ('token:login', token => {
	localStorage[LOCAL_STORAGE_PREFIX + 'login'] = btoa (token);
});
bus.on ('token:session', token => {
	appState.sessionToken = token;
	sessionStorage[LOCAL_STORAGE_PREFIX + 'session'] = btoa (token);
});


bus.on ('chat:msg', msg => {
	appState.chatLog.push (msg);
});


function tryToken (token: string) {
	return communication.tokenLogin (atob (token));
}

async function reestablishLogin () {
	if (!await tryToken (sessionStorage[LOCAL_STORAGE_PREFIX + 'session'])) {
		await tryToken (localStorage[LOCAL_STORAGE_PREFIX + 'login']);
	}
}
reestablishLogin ()
	.then (() => {
		appState.tryingTokenLogin = false;
	})
	.catch (err => {
		console.log (err);
	});


export default appState;
