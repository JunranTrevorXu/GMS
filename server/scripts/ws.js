const io = require('socket.io-client');

const socket = io('http://localhost:1994');

socket.on('connect', () => {
    socket.emit('register', {userId: 'ace'});
});

socket.on('message', ({fromUserId, message}) => {
    console.log("receive message", fromUserId, message);
});