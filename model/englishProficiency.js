import mongoose from 'mongoose';
const { v4: uuid } = require('uuid');

let englishProficiencySchema = new mongoose.Schema(
  {
    guid: {
      type: String,
      default: function () {
        return uuid();
      }
    },
    isExamTaken: { type: Boolean, default: true },
    examName: { type: String, required: true },
    examVersion: { type: String },
    pastDetails: {
      examTakenInLastTwoYear: { type: Boolean },
      examDate: { type: Date },
      overAllScore: { type: String },
      listening: { type: String },
      speaking: { type: String },
      writing: { type: String },
      reading: { type: String }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('englishProficiency', englishProficiencySchema);
