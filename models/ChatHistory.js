const mongoose = require("mongoose");

const { Schema } = mongoose;

const ChatHistory = new Schema({
  chat_id: String,
  content: Array,
  user_ids: Array
});

module.exports = mongoose.model("chat-history", ChatHistory);