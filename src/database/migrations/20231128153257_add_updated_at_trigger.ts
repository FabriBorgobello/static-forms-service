import { Knex } from 'knex';

export async function up(knex: Knex) {
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
    .select('table_name')
    .from('information_schema.columns')
    .where('column_name', 'updated_at')
    .andWhere('table_schema', 'public')
    .then((rows) => rows.map((row) => row.table_name));

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

export async function down(knex: Knex) {
  const tables = await knex
    .select('table_name')
    .from('information_schema.columns')
    .where('column_name', 'updated_at')
    .andWhere('table_schema', 'public')
    .then((rows) => rows.map((row) => row.table_name));

  for (const table of tables) {
    await knex.raw(`
      DROP TRIGGER IF EXISTS update_${table}_modtime ON ${table};
    `);
  }

  await knex.raw(`
    DROP FUNCTION IF EXISTS update_updated_at_column;
  `);
}
