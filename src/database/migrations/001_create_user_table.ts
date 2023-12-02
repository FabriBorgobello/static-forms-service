import { USER_ROLES } from '@/constants';
import { Kysely, sql } from 'kysely';
import { DB } from 'kysely-codegen';

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createType('user_role')
    .asEnum([...USER_ROLES])
    .execute();

  await db.schema
    .createTable('user')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('email', 'varchar', (col) => col.notNull().unique())
    .addColumn('hash', 'varchar(512)')
    .addColumn('salt', 'varchar(512)')
    .addColumn('refresh_token', 'varchar')
    .addColumn('google_id', 'varchar')
    .addColumn('role', 'varchar', (col) => col.defaultTo(USER_ROLES[0]).notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('user').execute();
}
