import catchAsync from '../helpers/catchAsync';
import responseObjectClass from '../helpers/responseObjectClass';
import AppError from '../helpers/AppError';
import crypto from 'crypto';
import user from '../model/user';

const responseObject = new responseObjectClass();

const createUser = catchAsync(async (req, res, next) => {
  const {
    body: { name, userName, email, mobileNumber, password }
  } = req;


  //check for user if it is already registered
  let checkUser = await user.findOne({
    $or: [{ email: email.toLowerCase() }, { mobile: mobileNumber }]
  });

  if (checkUser) return next(new AppError('Already Registered', 204));


  //hash password before saving in database
  let hashPassword = crypto
    .pbkdf2Sync(password, 'Anj43221', 10, 32, 'sha512')
    .toString(`hex`);

  let userObject = {
    name,
    userName,
    email: email.toLowerCase(),
    mobileNumber,
    password: hashPassword
  };

  //create new user in database
  let newUser = await user.create(userObject);
  if (!newUser) return next(new AppError('Failed to create user', 400));

  const newUserResponse = {
    name: newUser.name,
    userName: newUser.userName,
    email: newUser.email,
    mobileNumber: newUser.mobileNumber
  };

  const responseobj = responseObject.create({
    code: 200,
    success: true,
    message: 'User created',
    data: newUserResponse
  });

  return res.send(responseobj);
});


//---------------login-----------------------------

const login = catchAsync(async (req, res, next) => {
  const {
    body: { userName, password }
  } = req;

const foundUser = await user.findOne({userName : userName})
if(!foundUser) return next(new AppError('User not found', 404))

//compare password



//assign JWT

});

export default {
  createUser
};
