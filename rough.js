import 'core-js/stable';
import 'regenerator-runtime/runtime';
import mongoose from 'mongoose';
import app from './config/express';
import { userchange } from './server/controllers/users';
import { educationChange } from './server/controllers/education';
import { collegeEducationChange } from './server/controllers/college';
import { secondaryEducationChange } from './server/controllers/secondarySchool';
import { higherSecondaryEducationChange } from './server/controllers/higherSecondarySchool';
import { visaChange } from './server/controllers/visa';
import { relocationChange } from './server/controllers/relocation';
import { assignedCounsellorChange } from './server/controllers/counsellor';
import { workServicesChange } from './server/controllers/workService';
import { coachingChange } from './server/controllers/coaching';
import { additionalInfoChange } from './server/controllers/additionalInfo';
import { addressChange } from './server/controllers/address';
import { licenseChange } from './server/controllers/licenseOrCert';
import { aboutChange } from './server/controllers/about';
import { awardChange } from './server/controllers/awardsAndRegoc';
import { longTermInterestChange } from './server/controllers/longTermInterest';
import { travelHistoryChange } from './server/controllers/travelHistory';
import { expertiseChange } from './server/controllers/expertise';
import { visaHistoryChange } from './server/controllers/visaHistory';
import { experienceChange } from './server/controllers/experience';
import { spouseChange } from './server/controllers/spouse';
import { languageChange } from './server/controllers/language';
import { projectDetailsChange } from './server/controllers/projectDetails';
import { referencesChange } from './server/controllers/references';
import { sponsorChange } from './server/controllers/sponsor';
import { needAndPreferanceChange } from './server/controllers/needAndPreferences';
import { registrationSourceChange } from './server/controllers/registrationSource';
import { globalExposureChange } from './server/controllers/globalExposure';
import { testChanges } from './server/controllers/test';
import { familyDetailChange } from './server/controllers/familyDetails';
import UserSchema from './server/models/user';
import VisaSchema from './server/models/visa';
import RelocationSchema from './server/models/relocation';
import EducationSchema from './server/models/education';
import CollegeSchema from './server/models/college';
import AssignedCounsellorSchema from './server/models/assignedCounsellor';
import WorkServicesSchema from './server/models/workServices';
import CoachingSchema from './server/models/coaching';
import additionalInfoSchema from './server/models/additionalInfo';
import addressSchema from './server/models/address';
import experienceSchema from './server/models/experience';
import languageSchema from './server/models/languageProficiency';
import licenseSchema from './server/models/licenseOrCert';
import aboutSchema from './server/models/userAbout';
import awardSchema from './server/models/awardAndRecognition';
import interestSchema from './server/models/interest';
import travelHistorySchema from './server/models/travelHistory';
import expertiseSchema from './server/models/expertise';
import visaHistory from './server/models/visaHistory';
import SpouseSchema from './server/models/spouse';
import ProjectDetailSchema from './server/models/projectDetails';
import ReferencesSchema from './server/models/references';
import SponsorSchema from './server/models/sponsor';
import NeedAndPreferanceSchema from './server/models/needAndPreferences';
import RegistrationSourceSchema from './server/models/registrationSource';
import GlobalExposureSchema from './server/models/globalExposure';
import TestSchema from './server/models/test';
import FamilyDetailSchema from './server/models/familyDetails';
import logger from './server/helpers/logger';

/* This is the connection to the MongoDB database. */
mongoose.connect(`${process.env.MONGO_ROUTER}`, {
  auth: {
    authdb: process.env.Y_AXIS_MONGO_AUTH_DB,
    user: process.env.Y_AXIS_MONGO_AUTH_USER,
    password: process.env.Y_AXIS_MONGO_AUTH_PASSWORD
  },
  promiseLibrary: global.Promise
});

mongoose.connection.on('connected', function () {
  console.log(`Server Connected to Mongoose 💚 @ ${process.env.MONGO_ROUTER}`);

  UserSchema.watch([], { fullDocument: 'updateLookup' }).on(
    'change',
    change => {
      logger.info(`***User***: ${JSON.stringify(change)} `);
      userchange(change);
    }
  );

  // RegistrationSourceSchema.watch([], { fullDocument: 'updateLookup' }).on('change', (change) => {
  //   console.log('*****registration change*******', change);
  //   registrationSourceChange(change);
  // });

  SpouseSchema.watch().on('change', change => {
    logger.info(`***spouse***: ${JSON.stringify(change)} `);
    spouseChange(change);
  });

  VisaSchema.watch().on('change', change => {
    visaChange(change);
  });

  RelocationSchema.watch().on('change', change => {
    relocationChange(change);
  });

  CoachingSchema.watch().on('change', change => {
    logger.info(`***Coaching***: ${JSON.stringify(change)} `);
    coachingChange(change);
  });

  EducationSchema.watch([], { fullDocument: 'updateLookup' }).on(
    'change',
    change => {
      if (change.operationType === 'insert') {
        console.log(
          '*-*-*EDU change Insert*-*-*',
          change.fullDocument?.college?.length
        );
        if (
          change?.fullDocument?.school?.secondary &&
          change?.fullDocument?.school?.secondary?.institute !== null
        ) {
          logger.info(`***Sec Edu change***: ${JSON.stringify(change)} `);
          secondaryEducationChange(change);
        } else if (
          change?.fullDocument?.school?.higherSecondary &&
          change?.fullDocument?.school?.higherSecondary?.institute !== null
        ) {
          logger.info(
            `***High Sec School change***: ${JSON.stringify(change)} `
          );
          higherSecondaryEducationChange(change);
        } else {
          logger.info(`***education***: ${JSON.stringify(change)} `);
          educationChange(change);
        }
      }
      if (change.operationType === 'update') {
        console.log(
          'update secEdu',
          change?.updateDescription?.updatedFields?.school['secondary'],
          change?.updateDescription?.updatedFields?.school['secondary.sfId']
        );
        console.log(
          'update highSecEdu',
          change?.updateDescription?.updatedFields?.school['higherSecondary'],
          change?.updateDescription?.updatedFields?.school[
            'higherSecondary.sfId'
          ]
        );

        if (
          change?.updateDescription?.updatedFields?.yearOfFormalEducation !==
            undefined ||
          change?.updateDescription?.updatedFields?.interestedIn !== undefined
        ) {
          logger.info(`***change***: ${JSON.stringify(change)} `);
          educationChange(change);
        } else if (
          change?.updateDescription?.updatedFields?.school['secondary'] !==
            undefined ||
          change?.updateDescription?.updatedFields?.school['secondary.sfId'] !==
            undefined
        ) {
          console.log(
            '*-*-*Sec Edu change*-*-*',
            change?.updateDescription?.updatedFields
          );
          secondaryEducationChange(change);
        } else if (
          change?.updateDescription?.updatedFields?.school[
            'higherSecondary'
          ] !== undefined ||
          change?.updateDescription?.updatedFields?.school[
            'higherSecondary.sfId'
          ] !== undefined
        ) {
          console.log(
            '*-*-*High Sec School change*-*-*',
            change?.updateDescription?.updatedFields
          );
          higherSecondaryEducationChange(change);
        }
      }
    }
  );

  CollegeSchema.watch([], { fullDocument: 'updateLookup' }).on(
    'change',
    change => {
      if (
        change.operationType === 'insert' ||
        change.operationType === 'update'
      ) {
        logger.info(`***College***: ${JSON.stringify(change)} `);
        collegeEducationChange(change);
      }
    }
  );

  AssignedCounsellorSchema.watch().on('change', change => {
    assignedCounsellorChange(change);
  });

  WorkServicesSchema.watch().on('change', change => {
    workServicesChange(change);
  });

  additionalInfoSchema
    .watch([], { fullDocument: 'updateLookup' })
    .on('change', change => {
      additionalInfoChange(change);
    });

  addressSchema
    .watch([], { fullDocument: 'updateLookup' })
    .on('change', change => {
      addressChange(change);
    });

  experienceSchema.watch().on('change', change => {
    logger.info(`***Experience***: ${JSON.stringify(change)} `);
    experienceChange(change);
  });

  languageSchema
    .watch([], { fullDocument: 'updateLookup' })
    .on('change', change => {
      languageChange(change);
    });

  licenseSchema.watch().on('change', change => {
    logger.info(`***License***: ${JSON.stringify(change)} `);
    licenseChange(change);
  });

  aboutSchema.watch().on('change', change => {
    aboutChange(change);
  });

  awardSchema.watch().on('change', change => {
    awardChange(change);
  });

  interestSchema.watch().on('change', change => {
    longTermInterestChange(change);
  });

  travelHistorySchema.watch().on('change', change => {
    logger.info(`***travel***: ${JSON.stringify(change)} `);
    travelHistoryChange(change);
  });

  expertiseSchema
    .watch([], { fullDocument: 'updateLookup' })
    .on('change', change => {
      logger.info(`***expertise***: ${JSON.stringify(change)} `);
      expertiseChange(change);
    });

  visaHistory.watch().on('change', change => {
    logger.info(`***visaHistory***: ${JSON.stringify(change)} `);
    visaHistoryChange(change);
  });

  ProjectDetailSchema.watch().on('change', change => {
    projectDetailsChange(change);
  });

  ReferencesSchema.watch().on('change', change => {
    logger.info(`***Reference***: ${JSON.stringify(change)} `);
    referencesChange(change);
  });

  SponsorSchema.watch().on('change', change => {
    logger.info(`***Sponsor***: ${JSON.stringify(change)} `);
    sponsorChange(change);
  });

  NeedAndPreferanceSchema.watch().on('change', change => {
    logger.info(`***NeedAndPreferance***: ${JSON.stringify(change)} `);
    needAndPreferanceChange(change);
  });

  GlobalExposureSchema.watch().on('change', change => {
    logger.info(`***GlobalExposure***: ${JSON.stringify(change)} `);
    globalExposureChange(change);
  });

  TestSchema.watch().on('change', change => {
    logger.info(`***Test***: ${JSON.stringify(change)} `);
    testChanges(change);
  });

  FamilyDetailSchema.watch().on('change', change => {
    logger.info(`***FamilyDetails***: ${JSON.stringify(change)} `);
    familyDetailChange(change);
  });
});
/* This is a callback function that is called when the connection to the database is disconnected due to error. */
mongoose.connection.on('error', function (err) {
  console.error(
    `Failed to Connect to Mongoose 💥 @ ${process.env['RE-WEB-MONGO-DB']} | Error - ${err}`
  );
});

/* This is a callback function that is called when the connection to the database is disconnected. */
mongoose.connection.on('disconnected', function (info) {
  console.error(
    `Server and Mongoose Disconnected from 💥 @ ${process.env['RE-WEB-MONGO-DB']} | Error - ${info}`
  );
});

/* This is a catch all for any uncaught exceptions. */
process.on('uncaughtException', err => {
  console.error(`Uncaught Exception  💥  : ${err}`);
});

/* This is a catch all for any unhandled rejections. */
process.on('unhandledRejection', (reason, promise) => {
  console.error(`Unhandled rejection  💥  at ${promise}, reason: ${reason}`);
});

/* This is a callback function that is called when the server is started. */
app.listen(process.env.PORT, () => {
  console.log(
    `Server Started  💚  On Port (${process.env.PORT}) : (${process.env.NODE_ENV})`
  );
});

export default app;
