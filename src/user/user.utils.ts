import { db } from '@/database';
import { USER_PUBLIC_FIELDS } from './user.model';
import { Profile } from 'passport';

export async function getUserByEmail(email: string) {
  const user = await db.selectFrom('user').selectAll().where('email', '=', email).executeTakeFirst();
  return user;
}

export async function updateUserFromGoogle(email: string, profile: Profile) {
  const user = await db
    .updateTable('user')
    .set({ name: profile.displayName, google_id: profile.id, updated_at: new Date() })
    .where('email', '=', email)
    .returning(USER_PUBLIC_FIELDS)
    .executeTakeFirst();
  return user;
}
export async function createUserFromGoogle(email: string, profile: Profile) {
  const user = await db
    .insertInto('user')
    .values({ name: profile.displayName, email, google_id: profile.id })
    .executeTakeFirst();
  return user;
}
