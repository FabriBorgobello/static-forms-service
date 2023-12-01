import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { validatePassword } from '@/utils/crypto';
import { UnauthorizedError } from '@/utils/error-handler';
import { env } from '@/config';
import { createUserFromGoogle, getUserByEmail, updateUserFromGoogle } from '@/user/user.utils';

/** Google **/
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (_accessToken, _refreshToken, profile, done) => {
      // Check if user exists
      const email = profile.emails?.[0]?.value || '';
      const user = await getUserByEmail(email);
      // If the user doesn't exist, create the user.
      if (!user) {
        console.log('Creating new user');
        const newUser = await createUserFromGoogle(email, profile);
        return done(null, newUser);
      }

      // If the user exists, update the user with the latest google id and name.
      console.log('Updating user');
      const updatedUser = await updateUserFromGoogle(email, profile);
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
      const user = await getUserByEmail(username);
      if (!user || !user.hash || !user.salt) {
        return done(new UnauthorizedError());
      }

      // Validate password
      const isValid = validatePassword(password, user.hash, user.salt);
      if (!isValid) return done(new UnauthorizedError());

      return done(null, user);
    },
  ),
);
