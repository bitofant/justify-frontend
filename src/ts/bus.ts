import { EventEmitter } from 'events';
import transferred from './data-types/transferred';


namespace bus {

	const verbose = process && process.env && process.env.NODE_ENV && process.env.NODE_ENV === 'development';
	const emitter = new EventEmitter();

	export function on (event: 'app:title', callback: (title: string, subtitle?: string) => void): void;
	export function on (event: 'app:height', callback: (height: number) => void): void;
	export function on (event: 'login:success', callback: (user: transferred.User) => void): void;
	export function on (event: 'login:failed', callback: () => void): void;
	export function on (event: 'token:session'|'token:login', callback: (token: string) => void): void;
	export function on (event: 'chat:msg', callback: (msg: transferred.BCMessage) => void): void;
	export function on (event: string, callback: (...args: any[]) => void): void {
		if (verbose) console.log('bus.on(' + event + ', callback);');
		emitter.on(event, callback);
	}


	export function once (event: 'app:title', callback: (title: string, subtitle?: string) => void): void;
	export function once (event: 'app:height', callback: (height: number) => void): void;
	export function once (event: 'login:success', callback: (user: transferred.User) => void): void;
	export function once (event: 'login:failed', callback: () => void): void;
	export function once (event: 'token:session'|'token:login', callback: (token: string) => void): void;
	export function once (event: 'chat:msg', callback: (msg: transferred.BCMessage) => void): void;
	export function once (event: string, callback: (...args: any[]) => void): void {
		if (verbose) console.log('bus.once(' + event + ', callback);');
		emitter.once(event, callback);
	}


	export function emit (event: 'app:title', title: string, subtitle?: string): void;
	export function emit (event: 'app:height', height: number): void;
	export function emit (event: 'login:success', user: transferred.User): void;
	export function emit (event: 'login:failed'): void;
	export function emit (event: 'token:session'|'token:login', token: string): void;
	export function emit (event: 'chat:msg', msg: transferred.BCMessage): void;
	export function emit (event: string, ...args: any[]): void {
		if (verbose) console.log ('[bus.emit]', event, ...args);
		emitter.emit (event, ...args);
	}


	export function removeListener (event: 'app:title', callback: (title: string, subtitle?: string) => void): void;
	export function removeListener (event: 'app:height', callback: (height: number) => void): void;
	export function removeListener (event: 'login:success', callback: (user: transferred.User) => void): void;
	export function removeListener (event: 'login:failed', callback: () => void): void;
	export function removeListener (event: 'token:session'|'token:login', callback: (token: string) => void): void;
	export function removeListener (event: 'chat:msg', callback: (msg: transferred.BCMessage) => void): void;
	export function removeListener (event: string, callback: (...args: any[]) => void): void {
		emitter.removeListener (event, callback);
	}

}


export { bus };
export default bus;
