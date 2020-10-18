const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// username
// password
// confirmPassword
// phoneNumber

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String},
  phone: { type: Number},
},{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
