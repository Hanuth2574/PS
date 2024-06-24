// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Your React app's URL
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: "http://localhost:3000", // Your React app's URL
  methods: ["GET", "POST"]
}));

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('locationUpdate', (location) => {
    console.log(location);
    io.emit('locationUpdate', location);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
