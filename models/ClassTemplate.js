const mongoose = require("mongoose");

const { Schema } = mongoose;

const classTemplateSchema = new Schema({
  type: String,
  subject: String,
  description: String
  });

module.exports = mongoose.model("classTemplate", classSchema);