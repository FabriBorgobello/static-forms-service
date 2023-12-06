import { env } from '@/config';
import { User } from '@/user/user.model';
import jwt from 'jsonwebtoken';

export interface JwtPayload {
  id: number;
  name: string;
  email: string;
}

export function generateTokens({ id, email, name }: User) {
  const jwtPayload: JwtPayload = { id, email, name };
  const access = generateAccessToken(jwtPayload);
  const refresh = generateRefreshToken(jwtPayload);
  return { access, refresh };
}

export function generateAccessToken(jwtPayload: JwtPayload) {
  const access = jwt.sign({ ...jwtPayload, expiresIn: 60 * 60 * 24 }, env.JWT_SECRET);
  return access;
}

export function generateRefreshToken(jwtPayload: JwtPayload) {
  const refresh = jwt.sign(
    { ...jwtPayload, expiresIn: 60 * 60 * 24 * 7 },
    env.REFRESH_TOKEN_SECRET
  );
  return refresh;
}

export function verifyRefreshToken(refresh: string) {
  const jwtPayload = jwt.verify(refresh, env.REFRESH_TOKEN_SECRET) as JwtPayload;
  return jwtPayload;
}
