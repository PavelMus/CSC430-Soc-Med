const mongoose = require("mongoose");

const { Schema } = mongoose;

const feedSchema = new Schema({
  feedItems: Array
});

module.exports = mongoose.model("feed", feedSchema);