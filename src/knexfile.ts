import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.PGUSER,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT),
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: process.env.NODE_ENV === 'production' ? './dist/database/migrations' : './src/database/migrations',
    },
    seeds: {
      directory: process.env.NODE_ENV === 'production' ? './dist/database/seeds' : './src/database/seeds',
    },
  },
  // other environments (staging, production, etc.)
};

export default config;
