import { Insertable, Selectable, Updateable } from 'kysely';
import { Form as FormTable } from 'kysely-codegen';

// Allowed fields for public requests
export const FORM_PUBLIC_FIELDS = ['id', 'name', 'email', 'created_at', 'updated_at'] as const satisfies ReadonlyArray<
  keyof Form
>;

// Types
export type Form = Selectable<FormTable>;
export type FormInsert = Insertable<FormTable>;
export type FormUpdate = Updateable<FormTable>;
