const pg = require('pg');

const connectionString = process.env.DATABASE_URL;

const db = new pg.Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : undefined,
  connectionTimeoutMillis: 10000
});

module.exports = db;
