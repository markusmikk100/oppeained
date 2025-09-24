import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'koolikasutaja',
  password: 'ttrrop',
  database: 'oppeained',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
