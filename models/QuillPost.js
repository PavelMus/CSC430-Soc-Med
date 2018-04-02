const mongoose = require("mongoose");

const { Schema } = mongoose;

const quillPostSchema = new Schema({
  delta: JSON
});

module.exports = mongoose.model("quill", quillPostSchema);