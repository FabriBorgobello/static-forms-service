import { db } from '@/database';
import { encryptPassword } from '@/utils/crypto';

async function seed() {
  console.log('\x1b[33m%s\x1b[0m', '⌛ Seeding, please wait...');

  console.log('Inserting users...');
  await db.deleteFrom('user').execute();
  await db
    .insertInto('user')
    .values([
      { name: 'Tony Stark', email: 'tonystark@email.com', ...encryptPassword('tonystark'), role: 'admin' },
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

  console.log('Inserting forms...');
  await db.deleteFrom('form').execute();
  await db
    .insertInto('form')
    .values([
      { user_id: 1, title: 'Iron Man Tech', description: "Exploring the Evolution of Iron Man's Suit" },
      { user_id: 1, title: "Thor's Mjolnir", description: 'The Mythology and Science Behind Mjolnir' },
      { user_id: 2, title: 'Captain America', description: 'The Symbolism of Captain America in the Modern World' },
      { user_id: 3, title: 'Black Widow Ops', description: 'The Secret Missions of Black Widow' },
      { user_id: 3, title: "Hulk's Strength", description: 'Analyzing the Limitless Strength of the Hulk' },
      { user_id: 4, title: "Hawkeye's Accuracy", description: "The Physics of Hawkeye's Archery Skills" },
      { user_id: 5, title: 'Guardians of the Galaxy', description: 'The Interstellar Adventures of the Guardians' },
      { user_id: 5, title: "Thanos' Quest", description: "The Ethical Dilemmas of Thanos' Actions" },
      { user_id: 5, title: 'Infinity Stones Lore', description: 'The Cosmic History of the Infinity Stones' },
      { user_id: 6, title: "Doctor Strange's Spells", description: 'The Mystical Arts of Doctor Strange' },
      { user_id: 7, title: "Black Panther's Wakanda", description: 'The Technological Marvels of Wakanda' },
      { user_id: 8, title: "Spider-Man's Web", description: "The Science Behind Spider-Man's Web-Shooters" },
      { user_id: 9, title: "Ant-Man's Microverse", description: 'Exploring the Quantum Realm with Ant-Man' },
      { user_id: 11, title: "Falcon's Flight", description: "Engineering Behind Falcon's Wing Suit" },
      { user_id: 11, title: "Vision's Mind Stone", description: "The Role of the Mind Stone in Vision's Existence" },
      { user_id: 11, title: "Scarlet Witch's Reality", description: "Understanding Scarlet Witch's Powers" },
      { user_id: 12, title: "Loki's Tricks", description: 'The Trickster God Loki and His Illusions' },
      { user_id: 12, title: 'Asgardian Lore', description: 'The Rich History and Mythology of Asgard' },
      { user_id: 13, title: "Winter Soldier's Past", description: 'Unraveling the Mystery of the Winter Soldier' },
      { user_id: 14, title: 'The Avengers Initiative', description: 'The Formation and Evolution of The Avengers' },
      { user_id: 14, title: "Ultron's Rise", description: 'The Creation and Rebellion of Ultron' },
      { user_id: 14, title: 'Time Heist Strategy', description: 'Analyzing the Time Heist in Avengers: Endgame' },
      { user_id: 15, title: "S.H.I.E.L.D.'s Secrets", description: 'The Hidden Operations of S.H.I.E.L.D.' },
    ])
    .execute();

  console.log('Inserting submissions...');
  await db.deleteFrom('submission').execute();
  await db
    .insertInto('submission')
    .values([
      {
        form_id: 1,
        submitted_data: JSON.stringify({
          favorite_character: 'Iron Man',
          reason: 'Innovative technology and charismatic personality.',
        }),
      },
      {
        form_id: 1,
        submitted_data: JSON.stringify({
          favorite_technology: 'Arc Reactor',
          impact: 'Revolutionized sustainable energy sources in the MCU.',
        }),
      },
      {
        form_id: 2,
        submitted_data: JSON.stringify({
          favorite_aspect: "Mjolnir's mythology",
          comments: 'Intrigued by the blend of Norse mythology and modern storytelling.',
        }),
      },
      {
        form_id: 3,
        submitted_data: JSON.stringify({
          most_inspiring_moment: 'Captain America lifting Mjolnir',
          scene_impact: 'Symbolizes true heroism and worthiness.',
        }),
      },
      {
        form_id: 4,
        submitted_data: JSON.stringify({
          character_analysis: "Black Widow's evolution",
          observation: 'Growth from a spy to a leader and a hero.',
        }),
      },
      {
        form_id: 5,
        submitted_data: JSON.stringify({
          favorite_hulk_transformation: 'Professor Hulk',
          reason: 'Perfect balance of brains and brawn.',
        }),
      },
      {
        form_id: 5,
        submitted_data: JSON.stringify({
          hulk_smash_moment: 'Battle of New York',
          comments: "Iconic moment showcasing Hulk's raw power.",
        }),
      },
      {
        form_id: 6,
        submitted_data: JSON.stringify({
          hawkeye_skillset_evaluation: 'Master archer with unparalleled precision.',
        }),
      },

      {
        form_id: 7,
        submitted_data: JSON.stringify({
          favorite_guardian: 'Groot',
          reason: 'Unique character, both comedic and heroic.',
        }),
      },
      {
        form_id: 8,
        submitted_data: JSON.stringify({
          thoughts_on_thanos: 'Complex villain with a misguided sense of balance.',
        }),
      },
      {
        form_id: 9,
        submitted_data: JSON.stringify({
          infinity_stone_of_choice: 'Time Stone',
          desired_power: 'Ability to control and manipulate time.',
        }),
      },
      {
        form_id: 10,
        submitted_data: JSON.stringify({
          doctor_strange_ability: 'Master of the mystic arts with a strategic mind.',
        }),
      },
    ])
    .execute();

  console.log('\x1b[32m%s\x1b[0m', '🚀 Migrations completed!');
  await db.destroy();
}

seed();
