const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role:
  {
    type:String,
    default:"employee"
  }
});

userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;