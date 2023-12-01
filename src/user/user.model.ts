import { z } from 'zod';
import { Insertable, Selectable, Updateable } from 'kysely';
import { User } from '@/database/types';

export const UserPublicSchema = User.omit({
  hash: true,
  salt: true,
  google_id: true,
});

// Types
export type User = z.infer<typeof User>;
export type UserInsert = Insertable<User>;
export type UserUpdate = Updateable<User>;
export type UserSelect = Selectable<User>;
export type UserPublic = z.infer<typeof UserPublicSchema>;
