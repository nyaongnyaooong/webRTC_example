// server.js

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// 새로운 연결이 수립되었을 때 실행됩니다.
io.on('connection', (socket) => {
  console.log('New user connected');

  // 'offer' 이벤트를 수신하면 offer를 보낸 클라이언트에게 'offer' 이벤트를 전송합니다.
  socket.on('offer', (offer) => {
    socket.broadcast.emit('offer', offer);
  });

  // 'answer' 이벤트를 수신하면 answer를 보낸 클라이언트에게 'answer' 이벤트를 전송합니다.
  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer);
  });

  // 'candidate' 이벤트를 수신하면 candidate를 보낸 클라이언트에게 'candidate' 이벤트를 전송합니다.
  socket.on('candidate', (candidate) => {
    socket.broadcast.emit('candidate', candidate);
  });

  // 클라이언트 연결이 종료되었을 때 실행됩니다.
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});