const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const config = require('./config.js');

const { Server } = require('socket.io');
const io = new Server(server);

const path = require("path");

// ruta principal
app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/index.html'));
});

// conexion del socket
io.on('connection', (socket) => {
      socket.on('chat message', (msg) => {
            // emitir un mensaje a todos
            io.emit('chat message', msg);
      });
});

//escucha peticiones
server.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
});









