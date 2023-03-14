const mysql = require('mysql2');
const json2xml = require('json2xml');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Tcz@dmin#123'
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
});

connection.query('SELECT * FROM practice.customers', (err, results, fields) => {
  const xml = json2xml(results, { compact: true, spaces: 1 });
  console.log(xml);
});
