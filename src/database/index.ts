import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { env } from '@/config';
import { DB } from './types';

const dialect = new PostgresDialect({
  pool: new Pool({
    user: env.PGUSER,
    database: env.PGDATABASE,
    password: env.PGPASSWORD,
    host: env.PGHOST,
    port: env.PGPORT,
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<typeof DB>({ dialect });
