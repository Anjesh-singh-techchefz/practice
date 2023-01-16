import mongoose from 'mongoose';
const { v4: uuid } = require('uuid');

let educationSchema = new mongoose.Schema(
  {
    guid: {
      type: String,
      default: function () {
        return uuid();
      }
    },
    institution: { type: String, required: true },
    location: { type: String, required: true },
    levelOfEducation: { type: String, required: true },
    nameOfDegree: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    isHigestLevel: { type: Boolean, default: true },
    startDate: {
      month: {
        type: String,
        required: true,
        enum: ['January', 'February', 'March', 'April']
      },
      year: {
        type: String,
        required: true,
        enum: ['2010', '2011', '2012', '2013']
      }
    },
    endDate: {
      month: {
        type: String,
        required: true,
        enum: ['January', 'February', 'March', 'April']
      },
      year: {
        type: String,
        required: true,
        enum: ['2010', '2011', '2012', '2013']
      }
    },
    courseType: {
      type: String,
      default: '',
      enum: ['Full-time', 'Part-Time', '']
    },
    modeOfStudy: {
      type: String,
      default: '',
      enum: ['On-site learning', 'Traditional Learning', '']
    },
    otherInformation: { type: String, maxLength: 80, default: '' },
    sfId: { type: String, default: '' },
    userGUID: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('education', educationSchema);
