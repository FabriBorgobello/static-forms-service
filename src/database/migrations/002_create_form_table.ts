import { Kysely, sql } from 'kysely';
import { DB } from 'kysely-codegen';

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable('form')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('user_id', 'integer', (col) => col.notNull().references('user.id'))
    .addColumn('title', 'varchar', (col) => col.notNull())
    .addColumn('description', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('form').execute();
}
