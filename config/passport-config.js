require('dotenv').config();

const passportJWT = require('passport-jwt');
const UserSchema = require('../model/user');
const SessionDetailSchema = require('../model/session');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;

const passportConfiguration = passport => {
  let opts = {};

  /* This is the configuration for the User JWT strategy. */
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = process.env.JWT_SECRET;
  opts.passReqToCallback = true;

  passport.use(
    new JwtStrategy(opts, async (req, jwtPayload, cb) => {
      try {
        /* Find the session that the user is currently logged in with. */
        let foundSession = await SessionDetailSchema.findOne({
          $or: [
            { userGUID: jwtPayload.guid },
            { accessToken: req.headers.authorization }
          ]
        });

        /* Check if the user is logged in. If the user is not logged in, then we return false. */
        if (!foundSession) return cb(null, false);

        /* Find the user in the database. */
        const foundUser = await UserSchema.findOne({
          guid: jwtPayload.guid
        });

        /* Return a user if found, or return false if not found. */
        cb(null, foundUser ? foundUser : false);
      } catch (error) {
        console.error(
          `Error in Verifying User JWT Token- ${error} | GUID : ${jwtPayload.guid} | Token : ${req.headers.authorization}`
        );
        cb(error, false);
      }
    })
  );
};

module.exports = passportConfiguration;
