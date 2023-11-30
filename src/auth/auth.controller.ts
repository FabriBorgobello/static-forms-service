import passport from 'passport';
import { NextFunction, Request, Response } from 'express';

export function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('local', (err: Error, user: any, _info: any) => {
    // Handle error
    if (err) return next(err);

    req.login(user, { session: false }, (err) => {
      if (err) return next(err);
      return res.json(user);
    });
  })(req, res, next);
}

export function googleSignIn(req: Request, res: Response, next: NextFunction) {
  return passport.authenticate('google', {
    scope: ['profile', 'email'],
  })(req, res, next);
}
export function googleSignInCallback(req: Request, res: Response, next: NextFunction) {
  return passport.authenticate('google', {
    successRedirect: '/success.html',
    failureRedirect: '/',
    session: false,
  })(req, res, next);
}
