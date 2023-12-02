import { Insertable, Selectable, Updateable } from 'kysely';
import { Submission as SubmissionTable } from 'kysely-codegen';

// Allowed fields for public requests
export const SUBMISSION_PUBLIC_FIELDS = [
  'id',
  'form_id',
  'submitted_at',
  'submitted_data',
] as const satisfies ReadonlyArray<keyof Submission>;

// Types
export type Submission = Selectable<SubmissionTable>;
export type SubmissionInsert = Insertable<SubmissionTable>;
export type SubmissionUpdate = Updateable<SubmissionTable>;
