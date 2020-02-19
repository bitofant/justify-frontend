import axios from 'axios';
import sha3 from 'sha3';


function passwordHash (salt: string, password: string): string {
	return new sha3 (256)
		.update (salt.trim ().toLowerCase ())
		.update ('salt')
		.update (password)
		.digest ('hex');
}

axios.interceptors.response.use (res => {
	if (res.headers.token) {
		axios.defaults.headers.common.Authorization = btoa ('t0ken:' + res.headers.token);
		// socket.emit('token:update', res.headers['token']);
	}
	return res;
});


export { passwordHash };
export default passwordHash;
