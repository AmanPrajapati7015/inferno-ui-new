const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
// const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',                
        methods: ['GET', 'POST'],  
        credentials: true          
    }
});




io.on('connection', (socket) => {

    socket.on('drive-connection', (msg)=>console.log(msg));
    socket.on('arm-connection', (msg)=>console.log(msg));
    socket.on('front-end-connection', (msg)=>console.log(msg));

    socket.on('drive-client', (msg) => {
        console.log('drive-client :', msg);
        io.emit('drive-client', msg);
    });

    socket.on('arm-client', (msg) => {
        console.log('arm-client :', msg);
        io.emit('arm-client', msg);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
