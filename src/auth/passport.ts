import { db } from '@/database';
import { USER_PUBLIC_FIELDS } from '@/users/users.controller';
import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing google client id or secret');
}

const GoogleStrategy = passportGoogle.Strategy;
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
