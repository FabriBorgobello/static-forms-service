import { Insertable, Selectable, Updateable } from 'kysely';
import { User as UserTable } from 'kysely-codegen';

// Types
export type User = Selectable<UserTable>;
export type UserInsert = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
