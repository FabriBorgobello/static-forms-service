import knex, { Knex } from 'knex';
import { env } from '@/config';

export const databaseConfig = {
  user: env.PGUSER,
  database: env.PGDATABASE,
  password: env.PGPASSWORD,
  host: env.PGHOST,
  port: env.PGPORT,
};

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: databaseConfig,
  // NOTE: Both migrations and seeds paths are relative to this file.
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};

export const db = knex(knexConfig);

export default knexConfig;
