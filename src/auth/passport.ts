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
    (_accessToken, _refreshToken, profile, done) => {
      console.log('This is the profile', profile);
      done(null, profile);
    },
  ),
);
