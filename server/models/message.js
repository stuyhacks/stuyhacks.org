const mongoose = require('mongoose'),
  { Schema } = mongoose;

// Schema defines how messages will be stored in MongoDB
const messageSchema = new Schema({
  _creator: { type: Number, ref: 'User' },
  body: String,
  date: { type: Date, default: Date.now },
  meta: {
    cheers: Number,
  },
});

module.exports = mongoose.model('Message', messageSchema);