const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

let ordersSchema = new mongoose.Schema(
  {
    guid: {
      type: String,
      default: function () {
        return uuid();
      }
    },
    name: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('orders', ordersSchema);
