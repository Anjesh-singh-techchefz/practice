const mysql = require('mysql');

const connection = mysql.createConnection({
  database: 'dev_y_axis',
  username: 'dev_y_axis',
  password: 'Tcz@dmin#123',
  host: 'localhost',
  port: 3306
});

let value = connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
console.log(
  'value : ================================>>>>>>>>>>>>>>>>>>>>>>>',
  value
);
connection.end();
