import axios from 'axios';
import transferred from './data-types/transferred';

import './authentication';
import passwordHash from './authentication';

import bus from './bus';
import socket from './socket';

namespace communication {

	export const WRONG_PASSWORD = new Error('wrong password or e-mail address');

	export function tryLogin (credentials: transferred.LoginCredentials) {
		return new Promise<transferred.User> ((resolve, reject) => {
			axios.post<transferred.LoginResult> ('/api/login' + (credentials.stayLoggedin ? '?stayLoggedin' : ''), null, {
				headers: {
					Authorization: btoa (credentials.mail + ':' + passwordHash (credentials.mail, credentials.pass))
				}
			})
			.then (response => {
				if (response.status === 401) {
					reject (WRONG_PASSWORD);
					bus.emit ('login:failed');
				} else if (response.status >= 400) {
					reject (new Error('http #' + response.status + ' ' + response.statusText));
				} else {
					console.log (response.data);
					resolve (response.data.user);
					if (response.data.loginToken) {
						bus.emit ('token:login', response.data.loginToken);
					}
					bus.emit ('token:session', response.data.session);
					bus.emit ('login:success', response.data.user);
				}
			}).catch(err => {
				if (err && err.response && err.response.status && err.response.statusText) {
					if (err.response.status === 401) {
						reject(WRONG_PASSWORD);
						bus.emit ('login:failed');
					} else {
						reject (new Error('http #' + err.response.status + ' ' + err.response.statusText));
					}
				} else {
					reject (err);
				}
			});
		});
	}


	export function tokenLogin (token: string) {
		return new Promise<boolean> ((resolve) => {
			axios.post<transferred.LoginResult> ('/api/login/token', null, {
				headers: {
					Authorization: btoa (token)
				}
			})
			.then (response => {
				if (response.status > 200) {
					console.log (new Error('http #' + response.status + ' ' + response.statusText));
					resolve (false);
				} else {
					resolve (true);
					if (response.data.loginToken) {
						bus.emit ('token:login', response.data.loginToken);
					}
					bus.emit ('token:session', response.data.session);
					bus.emit ('login:success', response.data.user);
				}
			})
			.catch (err => {
				resolve (false);
			});
		});
	}


	export function sendChatMessage (msg: transferred.BCMessage) {
		console.log (msg);
		socket.emit ('chat:msg', msg);
	}
	// const chatSession: string = '';
	// export function sendChatMessage (msg: transferred.BCMessage) {
	// 	return new Promise<transferred.BCMessage> ((resolve, reject) => {
	// 		axios.post<transferred.BCMessage> ('/api/chat/message', msg, {
	// 			headers: { chatSession }
	// 		})
	// 		.then (response => {
	// 			console.log (response);
	// 			resolve (response.data);
	// 		})
	// 		.catch (err => {
	// 			reject (err);
	// 		});
	// 	});
	// }

}


export { communication };
export default communication;
