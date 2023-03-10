const mongoose = require('mongoose');
const logger = require('../config/winston');
const DATA_MIGRATION = 'mongodb://127.0.0.1:27017/datamigration';
const validationSchema = require('./validation').schema;

mongoose.connect(DATA_MIGRATION, () => {
  logger.log({
    level: 'data',
    message: `database connected`,
    data: DATA_MIGRATION,
    fileName: 'index.js',
    functionName: 'app.listen'
  });
});

mongoose.connection.on('connected', function () {
  logger.log({
    level: 'info',
    message: `Server Connected to Mongoose @ ${DATA_MIGRATION}`,
    fileName: 'index.js',
    functionName: 'mongoose'
  });
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  logger.log({
    level: 'error',
    message: `Failed to Connect to Mongoose @ ${DATA_MIGRATION} ${err}`,
    fileName: 'index.js',
    functionName: 'mongoose'
  });
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  logger.log({
    level: 'info',
    message: `Server and Mongoose Disconnected from @ ${DATA_MIGRATION}`,
    fileName: 'index.js',
    functionName: 'mongoose'
  });
});

const connection = mongoose.connection;

connection.once('open', async function migrate(limit = 10, set = 1) {
  const collection = connection.db.collection('trial');

  const data = await collection
    .find({})
    .limit(limit)
    .skip((set - 1) * limit)
    .toArray();

  if (data.length == 0) {
    return;
  }

  console.log(
    '<<<<<================== START VALIDATING =================>>>>>'
  );

  data.forEach(async (item, index, array) => {
    const { error } = validationSchema.validate(item);

    let validEmail;
    let validMobile;

    if (error == undefined) {
      (validEmail = true), (validMobile = true);
    }

    if (error?.message == '"Email" must be a valid email') {
      validEmail = false;
    } else {
      validEmail = true;
    }

    if (
      error?.message ==
        '"Mobile Phone" length must be at least 7 characters long' ||
      error?.message ==
        '"Mobile Phone" length must be less than or equal to 15 characters long'
    ) {
      validMobile = false;
    } else {
      validMobile = true;
    }

    await collection.findOneAndUpdate(
      { Email: item.Email, 'Mobile Phone': item['Mobile Phone'] },
      {
        $set: { isValidEmail: validEmail, isValidMobile: validMobile }
      }
    );
  });

  console.log(`validation completed for ${data.length} fields`);

  set += 1;

  migrate(limit, set);
});
