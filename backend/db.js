import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'koolikasutaja',
  password: 'ttrrop',        // SEE jääb ainult serverisse
  database: 'oppeained',
  waitForConnections: true,
  connectionLimit: 10
});

export default pool;
