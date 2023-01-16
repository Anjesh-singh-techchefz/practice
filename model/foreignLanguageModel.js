import mongoose from 'mongoose';
const { v4: uuid } = require('uuid');

let foreignLanguage = new mongoose.Schema(
  {
    guid: {
      type: String,
      default: function () {
        return uuid();
      }
    },
    haveAnyLanguageProficiency: { type: Boolean, default: true },
    language: {
      type: String,
      enum: [
        'Arabic',
        'Chinese',
        'French',
        'German',
        'Japanese',
        'Swedish',
        'Danish'
      ]
    },
    listening: { type: String, default: '' },
    speaking: { type: String, default: '' },
    writing: { type: String, default: '' },
    reading: { type: String, default: '' },

    sfId: { type: String, default: '' },
    userGUID: { type: String, default: '', unique: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('foreignLanguage', foreignLanguage);
