const catchAsync = require('../helpers/catchAsync').catchAsync;
const responseObjectClass = require('../helpers/responseObjectClass').ResponseObjectClass;
const AppError = require('../helpers/AppError').AppError;
const familyDetails = require('../model/familyDetailsModule')

const responseObject = new responseObjectClass();

const updateFamilyDetails = catchAsync(async (req, res, next) => {
  let {
    user: { guid },
    body: {
      martialStatus,
      children,
      includeChildren,
      includeSpouse,
      noOfchildren
    }
  } = req;

  const updateFamily = await familyDetails.findOneAndUpdate(
    {
      userGUID: guid
    },
    {
      $set: {
        martialStatus,
        children,
        includeChildren,
        includeSpouse,
        noOfchildren
      }
    },
    { new: true } //fetch new value
  );

  if (!updateFamily) {
    const familyObject = {
      martialStatus,
      children,
      includeChildren,
      includeSpouse,
      'noOfchildren.twelveyearsoryounger': twelveyearsoryounger,
      'noOfchildren.twelveyearsoryounger': thirteenToTwentyOne,
      'noOfchildren.twelveyearsoryounger': twentyTwoOrOlder,
      userGUID: guid
    };

    const createFamilyDetails = await familyDetails.create(familyDetails);

    if (!createFamilyDetails)
      return next(new AppError('Failed to create familyDetails', 409));

    const returnObj = responseObject.create({
      success: true,
      message: 'Family Details Created',
      data: createFamilyDetails,
      code: 200
    });
    return res.send(returnObj);
  }

  const returnObj = responseObject.create({
    success: true,
    message: 'Family Details Updated',
    data: updateFamily,
    code: 200
  });
  return res.send(returnObj);
});

export default {
  updateFamilyDetails
};
