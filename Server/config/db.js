const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'sa',
    password: '1234',
    database: 'realTimeCollaborativeTreeEditor',
    connectionLimit: 10,
});

db.connect((err) => {
  if (err) {
    console.error('Unable to connect to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL');
});

module.exports = db;
