"use strict";

require("dotenv").config();

const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const logger = require("morgan");

// Start the server
const port = process.env.PORT || 8080;
server.listen(port);
console.log(`Your server is running on port ${port}.`);

// Database setup
mongoose.connect(process.env.MONGO_URL, err => {
  logger.error("MongoDB connection error: " + err);
  // return reject(err);
  process.exit(1);
});
console.log("Connected to MongoDB.");

/*
// Set socket.io listeners.
io.on('connection', socket => {
  console.log("Socket is connected...")
  const db = database.db('stuyhacks');
  let messages = db.collection('messages');

  // Create function to send status
  const sendStatus = s => {
    socket.emit('status', s);
  };

  // Get chats from mongo collection
  messages.find().limit(100).sort({_id: 1}).toArray((err, res) => {
    if (err) {
      throw err;
    }

    // Emit the existing messages
    socket.emit('message output', res);
  });

  // Handle message events
  socket.on('message input', data => {
    const { name, message } = data;

    // check for name and message
    if (name === '') {
      // send error status
      sendStatus('please enter name');
    } else {
      // insert message
      messages.insert({ name, message }, () => {
        io.emit('message output', [data]);

        // send status object
        sendStatus({
          message: 'Message sent',
          clear: true
        });
      });
    }
  });

  socket.on('clear messages', () => {
    // remove all messages from collection
    messages.remove({}, () => {
      socket.emit('messages cleared');
    });
  });
  
});*/
