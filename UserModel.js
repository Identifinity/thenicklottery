let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  nick: String
});

let userModel = mongoose.model('User', userSchema);

module.exports = userModel;
