import { Kysely, sql } from 'kysely';
import { DB } from 'kysely-codegen';

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable('user')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('email', 'varchar', (col) => col.notNull().unique())
    .addColumn('hash', 'varchar(1024)')
    .addColumn('salt', 'varchar(512)')
    .addColumn('refresh_token', 'varchar')
    .addColumn('google_id', 'varchar')
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('user').execute();
}
