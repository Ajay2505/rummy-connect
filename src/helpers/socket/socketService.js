import { toast } from 'react-toastify';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_BACKENDURL);

socket.on('disconnect', () => {
    toast.error("Connection error. Please try refreshing the page!");
    console.log('Disconnected from WebSocket server');
});

socket.on('connect_error', (error) => {
    toast.error("Connection error. Please try refreshing the page!");
    console.error('Connection error:', error);
});

socket.on('reconnect_failed', () => {
    toast.error("Connection error. Please try refreshing the page!");
    console.error('Reconnection failed.');
});

export default socket;