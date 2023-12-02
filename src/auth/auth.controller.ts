import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { db } from '@/database';
import { encryptPassword, isPasswordCorrect } from '@/utils/crypto';
import { USER_PUBLIC_FIELDS } from '@/user/user.model';
import { UnauthorizedError } from '@/utils/error-handler';
import { env } from '@/config';

interface JwtPayload {
  email: string;
}

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

    // Generate JWT access token
    const jwtPayload = { email: user.email };
    const access = jwt.sign(jwtPayload, env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

    // Generate JWT refresh token
    const refresh = jwt.sign(jwtPayload, env.REFRESH_TOKEN_SECRET, { expiresIn: 60 * 60 * 24 * 7 });

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
    const jwtPayload = jwt.verify(refresh, env.REFRESH_TOKEN_SECRET) as JwtPayload;
    const user = await db.selectFrom('user').selectAll().where('email', '=', jwtPayload.email).executeTakeFirst();
    if (!user || user.refresh_token !== refresh) throw new UnauthorizedError();

    // Generate JWT access token
    const access = jwt.sign({ ...jwtPayload, exp: 60 * 60 * 24 }, env.JWT_SECRET);
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
    const jwtPayload = jwt.verify(refresh, env.REFRESH_TOKEN_SECRET) as JwtPayload;
    const user = await db.selectFrom('user').selectAll().where('email', '=', jwtPayload.email).executeTakeFirst();

    if (!user || user.refresh_token !== refresh) throw new UnauthorizedError();

    // Remove refresh token from database
    await db.updateTable('user').set({ refresh_token: null }).where('email', '=', user.email).execute();

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};
