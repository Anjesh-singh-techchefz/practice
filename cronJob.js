const moment = require('moment');
const cron = require('node-cron');

cron.schedule('59 23 * * *', () => {
  console.log('running a task ', moment().format('DD MMM YYYY hh:mm:ss'));
});

cron.schedule('* * 1,15 * *', () => {
  console.log('running a task ', moment().format('DD MMM YYYY hh:mm:ss'));
});

// cron.schedule('* * 15 * *', () => {
//   console.log('running a task ', moment().format('DD MMM YYYY hh:mm:ss'));
// });

