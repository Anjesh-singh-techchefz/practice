const mongoose = require('mongoose')
const { v4: uuid } = require('uuid');

let educationSchema = new mongoose.Schema(
  {
    guid: {
      type: String,
      default: function () {
        return uuid();
      }
    },
    institution: { type: String },
    location: { type: String },
    levelOfEducation: { type: String },
    nameOfDegree: { type: String, required: true },
    fieldOfStudy: { type: String },
    isHigestLevel: { type: Boolean, default: true },
    startDate: {
      month: {
        type: String,
        required: true,
        enum: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ]
      },
      year: {
        type: String,
        required: true,
        enum: [
          '2010',
          '2011',
          '2012',
          '2013',
          '2014',
          '2015',
          '2016',
          '2017',
          '2018',
          '2019',
          '2020',
          '2021',
          '2022'
        ]
      }
    },
    endDate: {
      month: {
        type: String,
        required: true,
        enum: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ]
      },
      year: {
        type: String,
        required: true,
        enum: [
          '2010',
          '2011',
          '2012',
          '2013',
          '2014',
          '2015',
          '2016',
          '2017',
          '2018',
          '2019',
          '2020',
          '2021',
          '2022'
        ]
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
