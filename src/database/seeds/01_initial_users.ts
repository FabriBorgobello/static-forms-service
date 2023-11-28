import { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    { name: 'John Doe', password: bcrypt.hash('johndoe', 10), email: 'johndoe@email.com' },
    { name: 'Jane Doe', password: bcrypt.hash('janedoe', 10), email: 'janedoe@email.com' },
    { name: 'John Smith', password: bcrypt.hash('johnsmith', 10), email: 'johnsmith@email.com' },
    { name: 'Alice Johnson', password: bcrypt.hash('alicejohnson', 10), email: 'alicej@email.com' },
    { name: 'Bob Brown', password: bcrypt.hash('bobbrown', 10), email: 'bobb@email.com' },
    { name: 'Charlie Davis', password: bcrypt.hash('charliedavis', 10), email: 'charlied@email.com' },
    { name: 'Diana Evans', password: bcrypt.hash('dianaevans', 10), email: 'dianae@email.com' },
    { name: 'Ethan Fox', password: bcrypt.hash('ethanfox', 10), email: 'ethanf@email.com' },
    { name: 'Fiona Green', password: bcrypt.hash('fionagreen', 10), email: 'fionag@email.com' },
    { name: 'George Harris', password: bcrypt.hash('georgeharris', 10), email: 'georgeh@email.com' },
  ]);
}
