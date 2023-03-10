const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
const crypto = require('crypto');

let clientSchema = new mongoose.Schema(
  {
    guid: {
      type: String,
      default: function () {
        return uuid();
      }
    },
    name: {
      salutation: {
        type: String,
        enum: ['Mr.', 'Ms.', 'Mrs.', ''],
        default: ''
      },
      first: { type: String, default: '' },
      middle: { type: String, default: '' },
      last: { type: String, default: '' }
    },
    dob: { type: String, default: '' },
    age: { type: String, default: '' },
    nationality: { type: String, default: '' },
    password: { type: String, select: false },
    contactDetails: {
      email: {
        primary: { type: String, required: true }
      },
      number: {
        mobile: {
          number: { type: String, required: true, default: '' },
          callingCode: { type: String, default: '91' }
        },
        whatsApp: {
          number: { type: String, default: '' },
          callingCode: { type: String, default: '91' }
        }
      }
    }
  },
  { timestamps: true }
);


clientSchema.pre('save', function hashing(){
  const secretCode = "Anjesh@techchefz"
  const document = this;

  const encrypt = (text, secret) => {
    let hash = crypto.createHmac('sha256', secret);
    let update = hash.update(text);
    let digest = update.digest('hex');
    return digest;
  }

  if(document.password) document.password = encrypt(document.password, secretCode); 
})

module.exports = mongoose.model('client', clientSchema);
