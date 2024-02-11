const { Pool } = require('pg');

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'farsana',
  host: 'localhost',
  database: 'students',
  password: 'password',
  port: 5432, // Default PostgreSQL port
});

module.exports = {
    query: (text, params) => pool.query(text, params)
  };
