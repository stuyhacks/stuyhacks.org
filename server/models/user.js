const mongoose = require("mongoose"),
  { Schema } = mongoose;

// Schema defines how users will be stored in MongoDB
const userSchema = new Schema({
  _id: Number,
  name: String,
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("User", userSchema);
