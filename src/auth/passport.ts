import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { db } from '@/database';
import { USER_PUBLIC_FIELDS } from '@/users/users.controller';
import { validatePassword } from '@/utils/crypto';
import { UnauthorizedError } from '@/utils/error-handler';

// TODO: Replace this with Zod
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing google client id or secret');
}

/** Google **/
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (_accessToken, _refreshToken, profile, done) => {
      // Check if user exists
      const email = profile.emails?.[0]?.value || '';
      const user = await db('users').where({ email }).first();
      // If the user doesn't exist, create the user.
      if (!user) {
        console.log('Creating new user');
        const [newUser] = await db('users')
          .insert({ name: profile.displayName, email, google_id: profile.id })
          .returning(USER_PUBLIC_FIELDS);
        return done(null, newUser);
      }

      // If the user exists, update the user with the latest google id and name.
      console.log('Updating user');
      const [updatedUser] = await db('users')
        .where({ email })
        .update({ name: profile.displayName, google_id: profile.id })
        .returning(USER_PUBLIC_FIELDS);
      return done(null, updatedUser);
    },
  ),
);

/** Local */
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (username, password, done) => {
      // Check if user exists or if it's not a local user (i.e. google user)
      const user = await db('users').where({ email: username }).first();
      console.log('user', user);
      if (!user || !user.hash || !user.salt) {
        return done(new UnauthorizedError());
      }

      // Validate password
      const isValid = validatePassword(password, user.hash, user.salt);
      if (!isValid) return done(new UnauthorizedError());

      // Remove sensitive fields
      // TODO: Check if this is the best way to do this. Maybe use Zod?
      Object.keys(user).forEach((key) => {
        if (USER_PUBLIC_FIELDS.includes(key)) return;
        delete user[key];
      });

      return done(null, user);
    },
  ),
);
