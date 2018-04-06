const mongoose = require("mongoose");

const { Schema } = mongoose;

const classSchema = new Schema({
  type: String,
  subject: String,
  section: String,
  description: String,
  teacher: String
});

module.exports = mongoose.model("alerts", classSchema);