const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname , '../public');

console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection' , (socket) => {
  console.log('New user connected.');
  socket.emit('newMessage' ,{
    from: 'Admin',
    text: 'Welcome to the chat.',
    createdAt: new Date().getTime()
  });
  socket.broadcast.emit('newMessage' , {
    from: 'Admin',
    text: 'A new challanger enters the arena.',
    createdAt: new Date().getTime()
  });

 
  socket.on('createMessage', (newMessage) => {
    console.log('Create Message: ' , newMessage);
    io.emit('newMessage' , {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });
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

