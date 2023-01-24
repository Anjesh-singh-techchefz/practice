const mongoose = require('mongoose');
const express = require('express');
const logger = require('./config/winston');
const router = require('./routes/userRoutes').router;
const app = express();
app.use(express.json());


mongoose.connect(process.env.db_url, () => {
  logger.log({
    level: 'data',
    message: `database connected`,
    data: process.env.db_url,
    fileName: 'index.js',
    functionName: 'app.listen'
  });
});

mongoose.connection.on('connected', function () {
  logger.log({
    level: 'info',
    message: `Server Connected to Mongoose @ ${process.env.db_url}`,
    fileName: 'index.js',
    functionName: 'mongoose'
  });
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  logger.log({
    level: 'error',
    message: `Failed to Connect to Mongoose @ ${process.env.db_url} ${err}`,
    fileName: 'index.js',
    functionName: 'mongoose'
  });
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  logger.log({
    level: 'info',
    message: `Server and Mongoose Disconnected from @ ${process.env.db_url}`,
    fileName: 'index.js',
    functionName: 'mongoose'
  });
});


app.use('/node/api',router);

app.listen(process.env.PORT, () => {
  logger.log({
    level: 'info',
    message: `Server is up & running at port ${process.env.PORT}`,
    fileName: 'index.js'
  });
});


module.exports = {
  app
};
