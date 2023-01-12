const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
  email:{
   type: String,
   required: true,
   unique: true,
  
  validate: [validator.isEmail,"Email must be valid"]
  },
  password:{
    type: String,
    required: [true,"Password is required"],
    minlength: [6,"Password must be at least 6 characters long"]
  }
})
userSchema.pre('save',async function (next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt .hash(this.password,salt)
  next()
})
const User = new mongoose.model('User', userSchema);

module.exports = User;