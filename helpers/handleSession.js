const moment = require('moment');
const uid = require('rand-token');
const session = require('../model/session')

exports.handleSession = async (user, accessToken) => {

  const refreshToken = `${uid(64)}`
  const refreshTokenExpiry = moment().add(5, 'days')

    const newSession = {
      refreshToken,
      refreshTokenExpiry,
      jwtToken: accessToken,
      userGUID: user.guid,
      userId: user._id
    };

    let saveSession = await session.create(newSession)
    if (!saveSession) return new AppError('Failed to save session', 409);
    return refreshToken

};
