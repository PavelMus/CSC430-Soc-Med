const mongoose = require("mongoose");
const { Schema } = mongoose; // The same as 'const Schema = mongoose.Schema;'

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  name: {
    familyName: String,
    givenName: String
  }
});

mongoose.model("users", userSchema);
