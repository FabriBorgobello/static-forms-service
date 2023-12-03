import { env } from '@/config';
import { db } from '@/database';
import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { createUserFromGoogle, getUserByEmail, updateUserFromGoogle } from '@/user/user.utils';

/** JWT **/
passport.use(
  new JWTStrategy(
    { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: env.JWT_SECRET },
    async (jwt_payload, done) => {
      const user = await db.selectFrom('user').selectAll().where('email', '=', jwt_payload.email).executeTakeFirst();
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    },
  ),
);

/** Google OAuth **/
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (_accessToken, _refreshToken, profile, done) => {
      // Check if user exists
      const email = profile.emails?.[0].value;
      if (!email) return done(null, false);
      const user = await getUserByEmail(email);

      // If user does not exist, create new user
      if (!user) {
        const newUser = await createUserFromGoogle(email, profile.displayName, profile.id);
        return done(null, newUser);
      }

      // If user exists, update name and google_id
      await updateUserFromGoogle(profile);
      return done(null, user);
    },
  ),
);
