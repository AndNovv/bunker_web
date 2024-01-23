import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://192.168.1.69:3001';

export const socket = io(URL);