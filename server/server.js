const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname , '../public');

console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection' , (socket) => {
  console.log('New user connected.');
  socket.emit('newMessage' ,generateMessage('Admin' , 'Welcome to the Arena.'));
  socket.broadcast.emit('newMessage' ,generateMessage('Admin' , 'A new hand touches the beacon.'));

 
  socket.on('createMessage', (newMessage) => {
    console.log('Create Message: ' , newMessage);
    io.emit('newMessage' , generateMessage(newMessage.from , newMessage.text));
    // socket.broadcast.emit('newMessage' , {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });
});




server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

