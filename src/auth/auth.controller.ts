import { NextFunction, Request, Response } from 'express';
import { db } from '@/database';
import { encryptPassword, isPasswordCorrect } from '@/utils/crypto';
import { USER_PUBLIC_FIELDS } from '@/user/user.model';
import { UnauthorizedError } from '@/utils/error-handler';
import passport from 'passport';
import { generateAccessToken, generateTokens, verifyRefreshToken } from './auth.utils';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password } = req.body;
    const user = await db
      .insertInto('user')
      .values({ email, name, ...encryptPassword(password) })
      .returning(USER_PUBLIC_FIELDS)
      .executeTakeFirst();

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

/** Find user, check password, generate JWT access token and refresh token */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await db.selectFrom('user').selectAll().where('email', '=', email).executeTakeFirst();

    if (!user || !user.hash || !user.salt) throw new UnauthorizedError();
    if (!isPasswordCorrect(password, user.hash, user.salt)) throw new UnauthorizedError();

    // Generate JWT access and refresh tokens
    const { access, refresh } = generateTokens(user);

    // Save refresh token to database
    await db.updateTable('user').set({ refresh_token: refresh }).where('email', '=', user.email).execute();

    res.status(200).json({ access, refresh });
  } catch (error) {
    next(error);
  }
};

/** Generate new access token from refresh token */
export const token = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refresh } = req.body;
    // Verify refresh token and get user
    const jwtPayload = verifyRefreshToken(refresh);
    const user = await db.selectFrom('user').selectAll().where('email', '=', jwtPayload.email).executeTakeFirst();
    if (!user || user.refresh_token !== refresh) throw new UnauthorizedError();

    // Generate JWT access token
    const access = generateAccessToken(user);
    res.status(200).json({ access });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

/** Remove refresh token from database */
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refresh } = req.body;
    // Verify refresh token and get user
    const jwtPayload = verifyRefreshToken(refresh);
    const user = await db.selectFrom('user').selectAll().where('email', '=', jwtPayload.email).executeTakeFirst();

    if (!user || user.refresh_token !== refresh) throw new UnauthorizedError();

    // Remove refresh token from database
    await db.updateTable('user').set({ refresh_token: null }).where('email', '=', user.email).execute();

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

/** Redirect to Google OAuth */
export const google = passport.authenticate('google', { scope: ['profile', 'email'] });

/** Google OAuth callback */
export const googleCallback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate('google', { session: false }, (err, user) => {
      if (err) return next(err);

      // Check if user exists
      if (!user) return res.redirect('/login');

      // Generate JWT access token and refresh token
      const { access, refresh } = generateTokens(user);

      // Save refresh token to database
      db.updateTable('user').set({ refresh_token: refresh }).where('email', '=', user.email).execute();

      res.status(200).json({ access, refresh });
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};
