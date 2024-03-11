import { io } from 'socket.io-client';

const devServerIP = '192.168.1.27'

const prodServerIP = '166.1.160.98'

const serverIp = process.env.NODE_ENV === 'development' ? devServerIP : prodServerIP

const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'

// "undefined" means the URL will be computed from the `window.location` object
const URL = `http://${serverIp}:3001`;

export const socket = io(URL);