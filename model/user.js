import mongoose from 'mongoose';
const { v4: uuid } = require('uuid');

let userSchema = new mongoose.Schema(
  {
    guid: {
      type: String,
      default: function () {
        return uuid();
      }
    },
    name: {type: String},
    userName: {type: String, required : true, unique: true},
    email: {type: String, required: true, unique: true},
    mobile: {type: Number},
    password: {type: String, required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
