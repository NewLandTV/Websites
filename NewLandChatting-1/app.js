const express = require('express');
const socket = require('socket.io');
const http = require('http');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use('/css', express.static('./static/css'));
app.use('/js', express.static('./static/js'));

app.get('/', (req, res) => {
    fs.readFile('./static/index.html', (err, data) => {
        if (err) {
            res.send('Error');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }
    });
});

io.sockets.on('connection', (socket) => {
    socket.on('newUser', (name) => {
        console.log(name + '님이 접속하였습니다.');
        socket.name = name;
        io.sockets.emit('update', { type: 'connect', name: 'system', message: socket.name + '님이 접속하였습니다.' });
    });

    socket.on('message', (data) => {
        data.name = socket.name;
        console.log(data);
        socket.broadcast.emit('update', data);
    });

    socket.on('disconnect', () => {
        console.log(socket.name + '님이 나가셨습니다.');
        socket.broadcast.emit('update', { type: 'disconnect', name: 'system', message: socket.name + '님이 나가셨습니다.' });
    });
});

server.listen(6974, () => {
    console.log('server on 6974 port');
});