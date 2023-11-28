import { Knex } from 'knex';
import { Environment } from './types';

const baseConfig: Knex.Config = {
  client: 'pg',
  connection: {
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    // ssl: {
    //   rejectUnauthorized: process.env.PGSSLMODE === 'require',
    // },
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './database/migrations',
  },
  seeds: {
    directory: './database/seeds',
  },
};

const config: {
  [key in Environment]: Knex.Config;
} = {
  development: {
    ...baseConfig,
  },
  production: {
    // TODO: Add production config
    ...baseConfig,
  },
};

export default config;
