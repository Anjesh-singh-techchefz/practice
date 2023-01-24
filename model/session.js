const mongoose = require('mongoose')
const uuid = require('uuid').v4;

let sessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    userGUID: { type: String, required: true },
    sessionId: {
      type: String,
      default: function () {
        return uuid();
      }
    },
    refreshToken: { type: String, default: '', required: true },
    refreshTokenExpiry: { type: Date, default: Date.now },
    accessToken: { type: String, default: '', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('session', sessionSchema);
