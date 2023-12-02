import passport from 'passport';
import { NextFunction, Request, Response } from 'express';

export function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('local', {
    successRedirect: '/success.html',
    failureRedirect: '/',
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
  })(req, res, next);
}
