import { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    { name: 'John Doe', password: await bcrypt.hash('johndoe', 10), email: 'johndoe@email.com' },
    { name: 'Jane Doe', password: await bcrypt.hash('janedoe', 10), email: 'janedoe@email.com' },
    { name: 'John Smith', password: await bcrypt.hash('johnsmith', 10), email: 'johnsmith@email.com' },
    { name: 'Alice Johnson', password: await bcrypt.hash('alicejohnson', 10), email: 'alicej@email.com' },
    { name: 'Bob Brown', password: await bcrypt.hash('bobbrown', 10), email: 'bobb@email.com' },
    { name: 'Charlie Davis', password: await bcrypt.hash('charliedavis', 10), email: 'charlied@email.com' },
    { name: 'Diana Evans', password: await bcrypt.hash('dianaevans', 10), email: 'dianae@email.com' },
    { name: 'Ethan Fox', password: await bcrypt.hash('ethanfox', 10), email: 'ethanf@email.com' },
    { name: 'Fiona Green', password: await bcrypt.hash('fionagreen', 10), email: 'fionag@email.com' },
    { name: 'George Harris', password: await bcrypt.hash('georgeharris', 10), email: 'georgeh@email.com' },
  ]);
}
