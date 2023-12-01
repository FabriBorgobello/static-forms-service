import { Insertable, Selectable, Updateable } from 'kysely';
import { User as UserTable } from 'kysely-codegen';

// Allowed fields for public requests
export const USER_PUBLIC_FIELDS = ['id', 'name', 'email', 'created_at', 'updated_at'] as const satisfies ReadonlyArray<
  keyof User
>;

// Types
export type User = Selectable<UserTable>;
export type UserInsert = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
