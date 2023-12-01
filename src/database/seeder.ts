import { db } from '@/database';
import { encryptPassword } from '@/utils/crypto';

async function seed() {
  console.log('\x1b[33m%s\x1b[0m', '⌛ Seeding, please wait...');

  console.log('Inserting users...');
  await db.deleteFrom('user').execute();
  await db
    .insertInto('user')
    .values([
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
    ])
    .execute();

  console.log('\x1b[32m%s\x1b[0m', '🚀 Migrations completed!');
  await db.destroy();
}

seed();
