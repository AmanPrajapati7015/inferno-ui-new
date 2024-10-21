const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
// const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',                // Allow all origins
        methods: ['GET', 'POST'],   // Specify allowed methods
        credentials: true           // If you need to allow credentials (optional)
    }
});

// app.use(cors());


io.on('connection', (socket) => {


    console.log('A client connected');

    // Listen for a message from the client
    socket.on('message', (msg) => {
        console.log('Message received:', msg);
        io.send(msg);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
