const mongoose = require('mongoose');
const {Schema} = mongoose;

//UserLocal Schema

const userLocal = new Schema({
  displayName:{
      type: String,
      required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name:{
      type: String,
      required: true
  },
  EMPLID: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true
  },
  password:{
      type: String,
      required: true
  },
  avatar: String,
  teacher: Boolean,
  admin: Boolean,
  classes: Array
});

module.exports = mongoose.model("users-local", userLocal);