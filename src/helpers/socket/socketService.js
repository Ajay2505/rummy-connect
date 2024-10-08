import { toast } from 'react-toastify';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_BACKENDURL, {
    path: '/server', // Ensure this matches the backend Socket.io path
    secure: true,    // Use secure connection
    transports: ['websocket'], // Force WebSocket transport
});

socket.on('disconnect', () => {
    toast.error("Connection error. Please try refreshing the page!");
});

socket.on('connect_error', () => {
    toast.error("Connection error. Please try refreshing the page!");
});

socket.on('reconnect_failed', () => {
    toast.error("Connection error. Please try refreshing the page!");
});

export default socket;