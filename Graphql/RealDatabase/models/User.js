const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  order: {
    type: Number,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }

});

const UserModel = model('User', UserSchema);

module.exports = UserModel;
