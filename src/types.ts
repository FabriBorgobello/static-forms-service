import { UserInsert } from './user/user.model';

export type Environment = 'development' | 'production';

/**
 * Augment the Express User type to include the user object.
 * This is used in the passport.deserializeUser function.
 * @see: https://stackoverflow.com/a/70633329
 */
declare global {
  namespace Express {
    interface User extends UserInsert {}
  }
}
