import { db } from '@/database';
import { USER_PUBLIC_FIELDS } from './user.model';
import { Profile } from 'passport';

export async function getUserByEmail(email: string) {
  const user = await db.selectFrom('user').select(USER_PUBLIC_FIELDS).where('email', '=', email).executeTakeFirst();
  return user;
}

export async function getUserById(id: number) {
  const user = await db.selectFrom('user').select(USER_PUBLIC_FIELDS).where('id', '=', id).executeTakeFirst();
  return user;
}

export async function createUserFromGoogle(email: string, name: string, google_id: string) {
  const user = await db
    .insertInto('user')
    .values({ email, name, google_id })
    .returning(USER_PUBLIC_FIELDS)
    .executeTakeFirst();
  return user;
}

export async function updateUserFromGoogle(profile: Profile) {
  const email = profile.emails?.[0].value;
  if (!email) return null;
  const user = await db
    .updateTable('user')
    .set({ name: profile.displayName, google_id: profile.id })
    .where('email', '=', email)
    .returning(USER_PUBLIC_FIELDS)
    .execute();

  return user;
}
