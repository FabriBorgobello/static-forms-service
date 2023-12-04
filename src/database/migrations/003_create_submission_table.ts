import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('submission')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('form_id', 'integer', (col) => col.notNull().references('form.id'))
    .addColumn('submitted_data', 'json', (col) => col.notNull())
    .addColumn('submitted_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('submission').execute();
}
