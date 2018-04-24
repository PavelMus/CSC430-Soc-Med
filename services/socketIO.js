var mongoose = require("mongoose");
var Users = require("../models/Users");
var ChatHistory = require("../models/ChatHistory");

//////// SOCKET IO FUNCTIONS  ////////////////////
var clients = {};

module.exports = io => {
    io.on('connection', socket => {
  
        clients[socket.id] = socket;
        console.log(socket.id + ": CONNECTED!");
      
        //io.emit('socket-data', socket);
        socket.on('subscribe', room => {
          console.log("joining room: " + room);
          socket.join(room);
          ChatHistory.findOne({chat_id: room}, (err, chat) =>{
              console.log("IN CHAT HISTORY FROM SOCKET");
              console.log(chat);
              //chat[0].content.push({displayName: "TEST", date: "23456789", message: "TESTING TESTING"});
              //chat[0].save();
          });
        });
        socket.on('private message', data => {
          console.log('sending room post', data.room);
          io.sockets.to(data.room).emit('private response', 
            {displayName: data.displayName, message: data.message, date: data.date}
          );
        });
        
        //socket.on('text', (text) => {
        //  let { message } = text;
        //  // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
        //  // we make use of the socket.emit method again with the argument given to use from the callback function above
        //  console.log(message);
        //  io.sockets.emit('socket-data', message);
        //})
         socket.on('disconnect', () => {
           delete clients[socket.id];
           console.log(socket.id + ": DISCONNECTED");
      })  
    })
}
