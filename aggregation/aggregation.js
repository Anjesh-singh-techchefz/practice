const mongoose = require('mongoose');
const logger = require('../config/winston');
const DATA_MIGRATION = 'mongodb://127.0.0.1:27017/aggregation';
const mobile = require('./schema');

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

const agg = async () => {
  const val = await mobile.aggregate([{ $currentOp: { allUsers: true } }]);

  // console.log(
  //   'val : ================================>>>>>>>>>>>>>>>>>>>>>>>',
  //   JSON.stringify(val)
  // );
  console.log(
    'val : ================================>>>>>>>>>>>>>>>>>>>>>>>',
    val
  );
};

agg();
