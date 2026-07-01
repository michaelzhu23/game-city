const dns = require('dns');
const pg = require('pg');

if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

function getSslConfig() {
  if (process.env.NODE_ENV !== 'production') return undefined;
  return { rejectUnauthorized: false };
}

function buildPoolConfig() {
  const ssl = getSslConfig();
  const base = {
    ssl,
    connectionTimeoutMillis: 30000,
    max: Number(process.env.DB_POOL_MAX || 5)
  };

  if (process.env.DATABASE_HOST) {
    const host = process.env.DATABASE_HOST;
    const port = Number(process.env.DATABASE_PORT || 5432);
    const user = process.env.DATABASE_USER;
    const password = encodeURIComponent(process.env.DATABASE_PASSWORD || '');
    const database = process.env.DATABASE_NAME || 'postgres';
    const params = new URLSearchParams({ sslmode: 'require' });

    if (port === 6543) {
      params.set('pgbouncer', 'true');
    }

    return {
      ...base,
      connectionString: `postgresql://${user}:${password}@${host}:${port}/${database}?${params.toString()}`
    };
  }

  if (process.env.DATABASE_URL) {
    let connectionString = process.env.DATABASE_URL;
    if (connectionString.startsWith('postgres://')) {
      connectionString = connectionString.replace('postgres://', 'postgresql://');
    }

    const url = new URL(connectionString);
    if (!url.searchParams.has('sslmode')) {
      url.searchParams.set('sslmode', 'require');
    }
    if (url.port === '6543' && !url.searchParams.has('pgbouncer')) {
      url.searchParams.set('pgbouncer', 'true');
    }

    return {
      ...base,
      connectionString: url.toString()
    };
  }

  return base;
}

const db = new pg.Pool(buildPoolConfig());

module.exports = db;
