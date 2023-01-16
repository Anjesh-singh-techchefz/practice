import catchAsync from '../../helpers/catchAsync';
import responseObjectClass from '../../helpers/responseObjectClass';
import AppError from '../../helpers/AppError';
import englishProficienySchema from '../model/englishProficiency'

const responseObject = new responseObjectClass()

const englishProficiency = catchAsync(async (req, res, next) => {

  let {
    user: { guid },
    body: { isExamTaken, examName, examVersion, pastDetails }
  } = req;

  const updateEnglishProficieny = await englishProficienySchema.findOneAndUpdate(
    { userGUID: guid },
    {
      $set: {
        isExamTaken,
        examName,
        examVersion,
        pastDetails
      }
    },
    {new : true}
  );

  if(!updateEnglishProficieny){
    const englishProficiency = {
      isExamTaken,
      examName,
      examVersion,
      pastDetails
    };

    const createEnglishProficiency = await englishProficienySchema.create(
      englishProficiency
    );

    if(!createEnglishProficiency) return next( new AppError('unable to create English Proficiency', 409))

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

})

export default {
  englishProficiency
};
