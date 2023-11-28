import { Knex } from 'knex';
import { generateHash } from '@/utils/crypto';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    { name: 'John Doe', email: 'johndoe@email.com', ...generateHash('johndoe') },
    { name: 'Jane Doe', email: 'janedoe@email.com', ...generateHash('janedoe') },
    { name: 'John Smith', email: 'johnsmith@email.com', ...generateHash('johnsmith') },
    { name: 'Alice Johnson', email: 'alicej@email.com', ...generateHash('alicejohnson') },
    { name: 'Bob Brown', email: 'bobb@email.com', ...generateHash('bobbrown') },
    { name: 'Charlie Davis', email: 'charlied@email.com', ...generateHash('charliedavis') },
    { name: 'Diana Evans', email: 'dianae@email.com', ...generateHash('dianaevans') },
    { name: 'Ethan Fox', email: 'ethanf@email.com', ...generateHash('ethanfox') },
    { name: 'Fiona Green', email: 'fionag@email.com', ...generateHash('fionagreen') },
    { name: 'George Harris', email: 'georgeh@email.com', ...generateHash('georgeharris') },
  ]);
}
