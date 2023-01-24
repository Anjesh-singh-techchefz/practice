const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

let userSchema = new mongoose.Schema(
  {
    guid: {
      type: String,
      default: function () {
        return uuid();
      }
    },
    name: {
      salutation: { type: String, enum: ['Mr.', 'Ms.', 'Mrs.'] },
      first: { type: String, default: '' },
      middle: { type: String, default: '' },
      last: { type: String, default: '' }
    },
    dob: { type: Date },
    age: { type: String, default: '' },
    gender: { type: String, default: '' },
    userName: { type: String, required: true, unique: true },
    contactDetails: {
      email: { type: String, unique: true },
      mobile: { type: Number, default: '' }
    },
    password: {
      current: { type: String, select: false },
      updatedAt: { type: Date, default: Date.now },
      previousPasswords: [{ type: String, select: false }]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
