import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_BACKENDURL);

socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
});

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
    // alert('Could not connect to the WebSocket server. Please check your connection and try again.');
});

socket.on('reconnect_failed', () => {
    console.error('Reconnection failed.');
    // alert('Reconnection to the WebSocket server failed. Please check your connection and try again.');
});

export default socket;