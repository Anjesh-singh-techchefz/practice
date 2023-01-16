import catchAsync from '../../helpers/catchAsync';
import responseObjectClass from '../../helpers/responseObjectClass';
import AppError from '../../helpers/AppError';
import foreignLangauge from './foreignLanguageModel';

const responseObject = new responseObjectClass();

const ForeignLanguage = catchAsync(async (req, res, next) => {
  let {
    user: { guid },
    body: {
      haveAnyLanguageProficiency,
      language,
      listening,
      speaking,
      writing,
      reading,
      languageGUID
    }
  } = req;

  if (languageGUID) {
    const updateForeignLanguage = await foreignLangauge.findOneAndUpdate(
      {
        userGUID: guid,
        guid: languageGUID
      },
      {
        $set: {
          haveAnyLanguageProficiency,
          language,
          listening,
          speaking,
          writing,
          reading
        }
      },
      { new: true }
    );

    if (!updateForeignLanguage)
      return next(new AppError('Failed to update Foreign language', 409));

    const responseObj = responseObject.create({
      success: true,
      message: 'Foreign language Updated',
      data: updateForeignLanguage,
      code: 200
    });

    return res.send(responseObj);
  }

  const foreignlangaugeObject = {
    haveAnyLanguageProficiency,
    language,
    listening,
    speaking,
    writing,
    reading,
    userGUID: guid
  };

  const addForeignLanguage = foreignLangauge.create(foreignlangaugeObject);
  if (!addForeignLanguage)
    return next(new AppError('Failed to create Foreign langauge', 409));

  const returnObj = responseObject.create({
    success: true,
    message: 'Foreign Language Added Successfully',
    data: addForeignLanguage,
    code: 200
  });

  return res.send(returnObj);
});

export default {
  ForeignLanguage
};
