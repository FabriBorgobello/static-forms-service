import { Knex } from 'knex';
import { env } from '@/config';

export const knexConfig: Knex.Config = {
  client: 'pg',
  connection: {
    user: env.PGUSER,
    database: env.PGDATABASE,
    password: env.PGPASSWORD,
    host: env.PGHOST,
    port: env.PGPORT,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './database/migrations',
  },
  seeds: {
    directory: './database/seeds',
  },
};
