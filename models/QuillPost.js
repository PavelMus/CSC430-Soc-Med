const mongoose = require("mongoose");

const { Schema } = mongoose;

const quillPostSchema = new Schema({
  author: String,
  authorAvatar: String,
  title: String,
  postDate: String,
  delta: Object,
  preview: Object
});

module.exports = mongoose.model("quill", quillPostSchema);