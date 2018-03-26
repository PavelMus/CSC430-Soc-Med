const mongoose = require("mongoose");
const { Schema } = mongoose; // The same as 'const Schema = mongoose.Schema;'

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  name: {
    familyName: String,
    givenName: String
  },
  avatar: String
});

module.exports = mongoose.model("users", userSchema);