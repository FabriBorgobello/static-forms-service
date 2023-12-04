import { Insertable, Selectable, Updateable } from 'kysely';
import { Submission as SubmissionTable } from 'kysely-codegen';

// Types
export type Submission = Selectable<SubmissionTable>;
export type SubmissionInsert = Insertable<SubmissionTable>;
export type SubmissionUpdate = Updateable<SubmissionTable>;
