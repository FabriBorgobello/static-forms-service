import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    { name: 'John Doe', password: 'johndoe', email: 'johndoe@email.com' },
    { name: 'Jane Doe', password: 'janedoe', email: 'janedoe@email.com' },
    { name: 'John Smith', password: 'johnsmith', email: 'johnsmith@email.com' },
    { name: 'Alice Johnson', password: 'alicejohnson', email: 'alicej@email.com' },
    { name: 'Bob Brown', password: 'bobbrown', email: 'bobb@email.com' },
    { name: 'Charlie Davis', password: 'charliedavis', email: 'charlied@email.com' },
    { name: 'Diana Evans', password: 'dianaevans', email: 'dianae@email.com' },
    { name: 'Ethan Fox', password: 'ethanfox', email: 'ethanf@email.com' },
    { name: 'Fiona Green', password: 'fionagreen', email: 'fionag@email.com' },
    { name: 'George Harris', password: 'georgeharris', email: 'georgeh@email.com' },
  ]);
}
