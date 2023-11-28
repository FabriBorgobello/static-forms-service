import Knex from 'knex';
import knexConfig from '../knexfile';

const knex = Knex(knexConfig.development);

export async function migrate() {
  console.log('Running migrations...');
  try {
    await knex.migrate.latest();
    console.log('Migrations are successful');
  } catch (error) {
    console.error('Migrations failed', error);
    process.exit(1); // Exit the process with an error code
  }
}

export async function seed() {
  console.log('Running seeds...');
  try {
    await knex.seed.run();
    console.log('Seeds are successful');
  } catch (error) {
    console.error('Seeds failed', error);
    process.exit(1); // Exit the process with an error code
  }
}
