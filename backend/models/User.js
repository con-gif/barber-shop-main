const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: Number, default: 1 }, // 1: Normal user, 2: Admin, 3: Developer
  isBanned: { type: Boolean, default: false }, // Default isBanned to false
});

const User = mongoose.model('User', userSchema);

module.exports = User;