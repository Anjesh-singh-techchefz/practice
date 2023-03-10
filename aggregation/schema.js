const mongoose = require('mongoose');

let mobileSchema = new mongoose.Schema({
  companyName: { type: String, default: '' },
  model: { type: String, default: '' },
  price: { type: Number, default: '' },
  size: {
    length: { type: Number, default: '' },
    width: { type: Number, default: '' }
  },
  color: { type: String, default: '' },
  inStock: { type: Boolean, default: '' },
  ram: { type: Number, default: '' },
  internalStorage: { type: Number, default: '' },
  battery: { type: String, default: '' }
});

module.exports = mongoose.model('mobile', mobileSchema);
