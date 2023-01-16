import catchAsync from '../../helpers/catchAsync';
import responseObjectClass from '../../helpers/responseObjectClass';
import AppError from '../../helpers/AppError';
import education from '../model/addEducationModel';

const responseObject = new responseObjectClass();

const addEducation = catchAsync(async (req, res, next) => {
  let {
    user: { guid },
    body: {
      institution,
      location,
      levelOfEducation,
      nameOfDegree,
      fieldOfStudy,
      isHigestLevel,
      startDate,
      endDate,
      courseType,
      modeOfStudy,
      otherInformation,
      educationGUID
    }
  } = req;

  if (educationGUID) {
    const updateEducation = await education.findOneAndUpdate(

      {
        userGUID: guid,
        guid: educationGUID
      },
      {
        $set: {
          institution,
          location,
          levelOfEducation,
          nameOfDegree,
          fieldOfStudy,
          isHigestLevel,
          startDate,
          endDate,
          courseType,
          modeOfStudy,
          otherInformation
        }
      },
      { new: true }
    );

    if(!updateEducation) return next(new AppError('Failed to update education form', 409))

    const returnObj = responseObject.create({
      success: true,
      message: 'Education form Updated',
      data: updateEducation,
      code: 200
    });
    return res.send(returnObj);
  }

  const educationObject = {
    institution,
    location,
    levelOfEducation,
    nameOfDegree,
    fieldOfStudy,
    isHigestLevel,
    startDate,
    endDate,
    courseType,
    modeOfStudy,
    otherInformation,
    userGUID: guid
  };

  const addNewEducation = await education.create(educationObject);
  if (!addNewEducation) return next(new AppError('Failed to add education', 409));

  const returnObj = responseObject.create({
    success: true,
    message: 'Education Added Successfully',
    data: addNewEducation,
    code: 200
  });

  return res.send(returnObj);
});

export default {
  addEducation
};
