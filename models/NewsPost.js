const mongoose = require("mongoose");

const { Schema } = mongoose;

const newsSchema = new Schema({
  author: String,
  authorAvatar: String,
  title: String,
  postDate: String,
  delta: Object,
  preview: String
});

module.exports = mongoose.model("news", newsSchema);