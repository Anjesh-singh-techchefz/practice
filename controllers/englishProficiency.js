const catchAsync = require('../helpers/catchAsync').catchAsync;
const responseObjectClass = require('../helpers/responseObjectClass').ResponseObjectClass;
const AppError = require('../helpers/AppError').AppError;
const englishProficienySchema = require('../model/englishProficiency');

const responseObject = new responseObjectClass();

const englishProficiency = catchAsync(async (req, res, next) => {
  let {
    user: { guid },
    body: { isExamTaken, examName, examVersion, pastDetails }
  } = req;

  const updateEnglishProficieny =
    await englishProficienySchema.findOneAndUpdate(
      { userGUID: guid },
      {
        $set: {
          isExamTaken,
          examName,
          examVersion,
          pastDetails
        }
      },
      { new: true }
    );

  if (!updateEnglishProficieny) {
    const englishProficiency = {
      isExamTaken,
      examName,
      examVersion,
      pastDetails
    };

    const createEnglishProficiency = await englishProficienySchema.create(
      englishProficiency
    );

    if (!createEnglishProficiency)
      return next(new AppError('unable to create English Proficiency', 409));

    const returnObj = new responseObject({
      success: true,
      message: 'English Proficiency Created Successfully',
      data: createEnglishProficiency,
      code: 200
    });

    return res.send(returnObj);
  }

  const returnObj = responseObject.create({
    success: true,
    message: 'English Proficiency Updated Successfully',
    data: updateEnglishProficieny,
    code: 200
  });
  return res.send(returnObj);
});

export default {
  englishProficiency
};
