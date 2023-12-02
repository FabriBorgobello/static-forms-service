import { db } from '@/database';

export async function getUserByEmail(email: string) {
  const user = await db.selectFrom('user').selectAll().where('email', '=', email).executeTakeFirst();
  return user;
}

export async function getUserById(id: number) {
  const user = await db.selectFrom('user').selectAll().where('id', '=', id).executeTakeFirst();
  return user;
}
