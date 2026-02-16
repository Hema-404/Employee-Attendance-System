const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mysql@123',
  database: 'attendance_system'
});

connection.connect((err) => {
  if(err) throw err;
  console.log('Connected to MySQL');
});

module.exports = connection;
