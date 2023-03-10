const passport = require('passport');
const AppError = require('../helpers/AppError');

exports.authenticateUser = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, userDtls, info) => {
    
    if (!userDtls && !error && !info) {
      console.error(
        `User - ${
          JSON.stringify(req.user) || 'Anonymous'
        }, Headers - ${JSON.stringify(req.headers)}, Body - ${JSON.stringify(
          req.body
        )}, ERROR 💥 - ${JSON.stringify(error, userDtls, info)}`
      );
      const errors = new AppError('UNAUTHORIZED', 401);
      return next(errors);
    }

    /* Logging the error and returning a 401 error. */
    if (error || info) {
      console.error(
        `User - ${
          JSON.stringify(req.user) || 'Anonymous'
        }, Headers - ${JSON.stringify(req.headers)}, Body - ${JSON.stringify(
          req.body
        )}, ERROR 💥 - ${JSON.stringify(error, userDtls, info)}`
      );
      return next(error || info);
    }

    if (userDtls) {
      req.user = userDtls;
      return next();
    }
  })(req, res, next);

  }

