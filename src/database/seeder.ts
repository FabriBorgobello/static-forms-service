import { db } from '@/database';
import { encryptPassword } from '@/utils/crypto';

async function seed() {
  console.log('\x1b[33m%s\x1b[0m', '⌛ Seeding, please wait...');

  console.log('Inserting users...');
  await db.deleteFrom('user').execute();
  await db
    .insertInto('user')
    .values([
      { name: 'Tony Stark', email: 'tonystark@email.com', ...encryptPassword('tonystark') },
      { name: 'Steve Rogers', email: 'steverogers@email.com', ...encryptPassword('steverogers') },
      { name: 'Natasha Romanoff', email: 'natasharomanoff@email.com', ...encryptPassword('natasharomanoff') },
      { name: 'Bruce Banner', email: 'brucebanner@email.com', ...encryptPassword('brucebanner') },
      { name: 'Thor Odinson', email: 'thorodinson@email.com', ...encryptPassword('thorodinson') },
      { name: 'Peter Parker', email: 'peterparker@email.com', ...encryptPassword('peterparker') },
      { name: 'Wanda Maximoff', email: 'wandamaximoff@email.com', ...encryptPassword('wandamaximoff') },
      { name: 'Stephen Strange', email: 'stephenstrange@email.com', ...encryptPassword('stephenstrange') },
      { name: 'Carol Danvers', email: 'caroldanvers@email.com', ...encryptPassword('caroldanvers') },
      { name: 'Scott Lang', email: 'scottlang@email.com', ...encryptPassword('scottlang') },
      { name: 'Matt Murdock', email: 'mattmurdock@email.com', ...encryptPassword('mattmurdock') },
      { name: 'Loki Laufeyson', email: 'lokilaufeyson@email.com', ...encryptPassword('lokilaufeyson') },
      { name: 'Sam Wilson', email: 'samwilson@email.com', ...encryptPassword('samwilson') },
      { name: 'Bucky Barnes', email: 'buckybarnes@email.com', ...encryptPassword('buckybarnes') },
      { name: 'Clint Barton', email: 'clintbarton@email.com', ...encryptPassword('clintbarton') },
    ])
    .execute();

  console.log('\x1b[32m%s\x1b[0m', '🚀 Migrations completed!');
  await db.destroy();
}

seed();
