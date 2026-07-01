const dns = require('dns');
const pg = require('pg');

if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

function buildConnectionString() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return connectionString;

  const url = new URL(connectionString);
  if (!url.searchParams.has('sslmode')) {
    url.searchParams.set('sslmode', 'require');
  }
  return url.toString();
}

const connectionString = buildConnectionString();

const db = new pg.Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : undefined,
  connectionTimeoutMillis: 30000
});

module.exports = db;
