const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: Number,
  name: String,
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
})

const messageSchema = new Schema({
  _creator: { type: Number, ref: 'User' },
  body: String,
  date: { type: Date, default: Date.now },
  meta: {
    cheers: Number,
  },
});

module.exports = {
  userSchema,
  messageSchema,
};