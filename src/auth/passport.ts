import { env } from '@/config';
import { db } from '@/database';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

passport.use(
  new Strategy(
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
