import { io } from 'socket.io-client';

const devServerIP = '192.168.1.27'

const serverIp = process.env.NODE_ENV === 'development' ? devServerIP : process.env.NEXT_PUBLIC_SERVER_IP

// "undefined" means the URL will be computed from the `window.location` object
const URL = `http://${serverIp}:3001`;

export const socket = io(URL);