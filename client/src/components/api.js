import io from 'socket.io-client';
const socket = io();


function connectToSocket(cb){
    console.log('Connecting.');
    socket.on('acceptConnection', vals => cb(null, vals));
}

function disconnectFromServer(){
    console.log('Disconnecting.');
    socket.emit('disconnect');
}

export { connectToSocket, disconnectFromServer };