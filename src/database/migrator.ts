import * as path from 'path';
import { promises as fs } from 'fs';
import { Migrator, FileMigrationProvider } from 'kysely';
import { db } from '@/database';

/**
 * This script is used to run migrations from the command line.
 * It will look for migrations in the `migrations`
 */

async function migrateToLatest() {
  console.log('\x1b[33m%s\x1b[0m', '⌛ Running migrations, please wait...');

  const provider = new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(__dirname, 'migrations'),
  });

  const migrator = new Migrator({ db, provider });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }

  if (!results || results.length === 0) {
    console.log('No migrations to run');
  }

  await db.destroy();
}

migrateToLatest();
