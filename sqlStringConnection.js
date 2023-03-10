const sql = require('msnodesqlv8');

const connectionString = '';
const query = 'SELECT * from user';

sql.query(connectionString, query, (err, row) => {
  console.log(row);
});


