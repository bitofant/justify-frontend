import transferred from './data-types/transferred';
import { Socket } from 'socket.io';
import bus from './bus';

declare var io: any;

function CreateSocket (): Socket {
	if (typeof (io) !== 'undefined') {
		return io (location.href);
	}
	return { connected: false } as Socket;
}
const socket: Socket = CreateSocket ();

socket.on ('chat:msg', (msg: transferred.BCMessage) => {
	bus.emit ('chat:msg', msg);
});

export { socket };
export default socket;
