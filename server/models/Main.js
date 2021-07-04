const mongoose = require('mongoose');

const Main = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email_id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Main', Main);