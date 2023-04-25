const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  //Schema
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email"
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"]
  }
})

const User = new mongoose.model('User', userSchema);

module.exports = User;