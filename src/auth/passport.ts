import { env } from '@/config';
import { db } from '@/database';
import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { createUserFromGoogle, getUserByEmail, updateUserFromGoogle } from '@/user/user.utils';
import { isPasswordCorrect } from '@/utils/crypto';
import { JwtPayload } from './auth.utils';

/**
 * JWT Strategy
 * - Extracts JWT from Authorization header
 * - Verifies JWT and decodes payload
 * - Finds user by email in payload
 */
passport.use(
  new JWTStrategy(
    { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: env.JWT_SECRET },
    async (jwt_payload: JwtPayload, done) => {
      const user = await db.selectFrom('user').selectAll().where('id', '=', jwt_payload.id).executeTakeFirst();
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    },
  ),
);

/**
 * Google Strategy
 * - Verifies Google OAuth2 token
 * - Retrieves user profile
 * - Finds user by email in profile
 */
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
      if (!email) return done(null, undefined);
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

/**
 * Local Strategy
 * - Verifies username and password
 * - Finds user by email in profile
 */
passport.use(
  new LocalStrategy(async (username, password, done) => {
    // Check if user exists
    const user = await getUserByEmail(username);
    if (!user || !user.email || !user.hash || !user.salt) return done(null, false);

    // Check if password is correct
    const isCorrect = isPasswordCorrect(password, user.hash, user.salt);
    if (!isCorrect) return done(null, false);

    // Return user
    return done(null, user);
  }),
);
