'use strict'

const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(3001).sockets;

console.log(`Listening on port ${3001}...`);

let users = [];

mongo.connect('mongodb://127.0.0.1/stuyhacks', (err, database) => {
  if (err) {
    throw err;
  }

  console.log('MongoDB connected...');

  // Connect to socket.io
  client.on('connection', socket => {
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
          client.emit('message output', [data]);

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
    })

    socket.on('new user', (data, callback) => {
      callback(true);
      socket.username = data.username;
      users.push(socket.username);
      updateUsernames();
    });

    const updateUsernames = () => io.sockets.emit('get users', users);
  });
});
