const mongoose = require("mongoose");

const { Schema } = mongoose;

const eventsSchema = new Schema({
  author: String,
  authorAvatar: String,
  title: String,
  postDate: String,
  delta: Object,
  preview: String
});

module.exports = mongoose.model("events", eventsSchema);