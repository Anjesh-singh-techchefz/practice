const catchAsync = require('../helpers/catchAsync').catchAsync;
const responseObjectClass =
  require('../helpers/responseObjectClass').ResponseObjectClass;
const AppError = require('../helpers/AppError').AppError;
const user = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const handleSession = require('../helpers/handleSession');
const hashPassword = require('../helpers/auth').hashPassword;
const comparePassword = require('../helpers/auth').comparePassword;

const responseObject = new responseObjectClass();

//==================================== Signup ===============================================

const createUser = catchAsync(async (req, res, next) => {
  const {
    body: { name, dob, age, gender, userName, email, password }
  } = req;
  console.log('above finduser', email);
  //check for user if it is already registered
  let foundUser = await user.find({
    'contactDetails.email': email
  });

  console.log('after finduser============');

  if (foundUser) return next(new AppError('Already Registered', 204));

  //hash password before saving in database
  let hashedPassword = hashPassword(password);

  let userObject = {
    name,
    dob,
    age,
    gender,
    userName,
    'contactDetails.email': contactDetails.email.toLowerCase(),
    'contactDetails.mobile': contactDetails.mobile,
    'password.current': hashedPassword
  };

  //create new user in database
  let savedUser = await user.create(userObject);
  if (!savedUser) return next(new AppError('Failed to create user', 400));

  const newUserResponse = {
    name: savedUser.name,
    dob: savedUser.dob,
    age: savedUser.age,
    gender: savedUser.gender,
    userName: savedUser.userName,
    email: savedUser.contactDetails.email,
    mobile: savedUser.contactDetails.mobile
  };

  const jwtToken = jwt.sign(newUserResponse, process.env.SECRET_FOR_JWT, {
    expiresIn: '1h'
  });

  const refreshToken = handleSession(savedUser, jwtToken);

  const responseobj = responseObject.create({
    code: 200,
    success: true,
    message: 'User created',
    data: {
      jwtToken: jwtToken,
      refreshToken,
      user: newUserResponse
    }
  });

  return res.send(responseobj);
});

//=================================== login ============================================

const login = catchAsync(async (req, res, next) => {
  const {
    body: { userName, email, mobile, password }
  } = req;

  //check for user exist
  const userObject = { userName: userName };
  const emailObject = { 'contactDetails.email': email };
  const mobileObject = { 'contactDetails.mobile': mobile };

  const foundUser = await user.findOne({
    $or: [userObject, emailObject, mobileObject]
  });
  if (!foundUser) return next(new AppError('User not found', 404));

  const responseObj = {
    firstName: foundUser.name.first,
    lastName: foundUser.name.last,
    email: foundUser.contactDetails.email,
    mobile: foundUser.contactDetails.mobile,
    guid: foundUser.guid
  };

  //compare password & assign JWT token and refresh token
  if (comparePassword(foundUser.password.current, password)) {
    const jwtToken = jwt.sign(newUserResponse, process.env.SECRET_FOR_JWT, {
      expiresIn: '1h'
    });

    const refreshToken = handleSession(foundUser, jwtToken);

    const returnObject = responseObject.create({
      code: 200,
      success: true,
      message: 'Successfully logged in',
      data: {
        refreshToken,
        jwtAccessToken: jwtToken,
        user: responseObj
      }
    });

    return res.send(returnObject);
  }

  return next(new AppError('Incorrect Password', 401));
});

module.exports = {
  createUser,
  login
};
