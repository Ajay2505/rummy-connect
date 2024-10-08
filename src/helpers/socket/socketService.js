import { toast } from 'react-toastify';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_BACKENDURL, { secure: true });

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