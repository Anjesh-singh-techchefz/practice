const mongoose = require('mongoose');
const logger = require('../config/winston');
const client = require('./clientModel');
const csvPath = '../newdata.csv';
const csv = require('csvtojson');
const DATA_MIGRATION = 'mongodb://127.0.0.1:27017/datamigration';
const generator = require('generate-password');
const validationSchema = require('./joiValidation').schema;

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

async function migrate() {
  console.log(
    '========================= Start Migrating ========================='
  );

  let failed = 0;
  let success = 0;

  const data = await csv().fromFile(csvPath);

  data.forEach(async (item, index, array) => {
    const pass = generator.generate({
      length: 10,
      numbers: true
    });

    const object = {
      'name.first': item['First Name'],
      'name.last': item['Last Name'],
      age: item.Age,
      'contactDetails.number.whatsApp.number': item['Whatsapp Number'],
      'contactDetails.email.primary': item.Email,
      'contactDetails.number.mobile.number': item['Mobile Phone'],
      nationality: item.Nationality,
      dob: item['Date of Birth'],
      password: pass
    };

    const { error } = validationSchema.validate(object);

    if (error == undefined) {
      const createData = await client.create(object);

      if (!createData) {
        failed += 1;
      } else {
        success += 1;
      }
    } else {
      failed += 1;
      return console.log(`${item['Full Name']} : ${error.message}`);
    }

    let total = failed + success;

    if (total == array.length) {
      console.log('Failed : ', failed);
      console.log('Success : ', success);
      console.log('Total : ', total);
    }
  });
}

migrate();
