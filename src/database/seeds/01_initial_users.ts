import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    { id: 1, name: 'John Doe', password: 'johndoe', email: 'johndoe@email.com' },
    { id: 2, name: 'Jane Doe', password: 'janedoe', email: 'janedoe@email.com' },
    { id: 3, name: 'John Smith', password: 'johnsmith', email: 'johnsmith@email.com' },
    { id: 4, name: 'Alice Johnson', password: 'alicejohnson', email: 'alicej@email.com' },
    { id: 5, name: 'Bob Brown', password: 'bobbrown', email: 'bobb@email.com' },
    { id: 6, name: 'Charlie Davis', password: 'charliedavis', email: 'charlied@email.com' },
    { id: 7, name: 'Diana Evans', password: 'dianaevans', email: 'dianae@email.com' },
    { id: 8, name: 'Ethan Fox', password: 'ethanfox', email: 'ethanf@email.com' },
    { id: 9, name: 'Fiona Green', password: 'fionagreen', email: 'fionag@email.com' },
    { id: 10, name: 'George Harris', password: 'georgeharris', email: 'georgeh@email.com' },
  ]);
}
