import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = now(); 
      RETURN NEW;
    END;
    $$ language 'plpgsql';
  `);

  const tables = await knex
    .select('tablename')
    .from('pg_tables')
    .where('schemaname', 'public')
    .andWhereRaw("has_column(tablename, 'updated_at')")
    .then((rows) => rows.map((row) => row.tablename));

  for (const table of tables) {
    await knex.raw(`
      DROP TRIGGER IF EXISTS update_${table}_modtime ON ${table};
      CREATE TRIGGER update_${table}_modtime
      BEFORE UPDATE ON ${table}
      FOR EACH ROW
      EXECUTE PROCEDURE update_updated_at_column();
    `);
  }
}

export async function down(knex: Knex): Promise<void> {
  const tables = await knex
    .select('tablename')
    .from('pg_tables')
    .where('schemaname', 'public')
    .andWhereRaw("has_column(tablename, 'updated_at')")
    .then((rows) => rows.map((row) => row.tablename));

  for (const table of tables) {
    await knex.raw(`
      DROP TRIGGER IF EXISTS update_${table}_modtime ON ${table};
    `);
  }

  await knex.raw(`
    DROP FUNCTION IF EXISTS update_updated_at_column;
  `);
}
