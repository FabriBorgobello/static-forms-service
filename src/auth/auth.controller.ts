import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

export function googleSignIn(req: Request, res: Response, next: NextFunction) {
  return passport.authenticate('google', {
    scope: ['profile', 'email'],
  })(req, res, next);
}
export function googleSignInCallback(req: Request, res: Response, next: NextFunction) {
  return passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/success',
    session: false,
  })(req, res, next);
}
