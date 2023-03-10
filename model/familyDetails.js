const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

let familyDetailsSchema = new mongoose.Schema(
  {
    guid: {
      type: String,
      default: function () {
        return uuid();
      }
    },
    martialStatus: {
      type: String,
      default: '',
      enum: ['Single', 'Married', 'Divorced', 'Separted', '']
    },
    children: { type: Boolean, default: true },
    includeChildren: { type: Boolean, default: true },
    includeSpouse: { type: Boolean, default: true },
    noOfchildren: {
      twelveYearsOrYounger: { type: String, default: '' },
      thirteenToTwentyOne: { type: String, default: '' },
      twentyTwoOrOlder: { type: String, default: '' }
    },
    sfId: { type: String, default: '' },
    userGUID: { type: String, default: '', unique: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('familyDetails', familyDetailsSchema);
