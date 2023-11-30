import { Knex } from 'knex';
import { encryptPassword } from '@/utils/crypto';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    { name: 'John Doe', email: 'johndoe@email.com', ...encryptPassword('johndoe') },
    { name: 'Jane Doe', email: 'janedoe@email.com', ...encryptPassword('janedoe') },
    { name: 'John Smith', email: 'johnsmith@email.com', ...encryptPassword('johnsmith') },
    { name: 'Alice Johnson', email: 'alicej@email.com', ...encryptPassword('alicejohnson') },
    { name: 'Bob Brown', email: 'bobb@email.com', ...encryptPassword('bobbrown') },
    { name: 'Charlie Davis', email: 'charlied@email.com', ...encryptPassword('charliedavis') },
    { name: 'Diana Evans', email: 'dianae@email.com', ...encryptPassword('dianaevans') },
    { name: 'Ethan Fox', email: 'ethanf@email.com', ...encryptPassword('ethanfox') },
    { name: 'Fiona Green', email: 'fionag@email.com', ...encryptPassword('fionagreen') },
    { name: 'George Harris', email: 'georgeh@email.com', ...encryptPassword('georgeharris') },
  ]);
}
