import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
    NEW.updated_at = now(); 
    RETURN NEW;
    END;
    $$ language 'plpgsql';

    CREATE TRIGGER update_user_modtime
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
`);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    DROP TRIGGER IF EXISTS update_user_modtime ON users;
    DROP FUNCTION IF EXISTS update_updated_at_column;
`);
}
