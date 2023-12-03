import { env } from '@/config';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  email: string;
}

export function generateTokens(user: { email: string }) {
  const jwtPayload = { email: user.email };
  const access = generateAccessToken(jwtPayload);
  const refresh = generateRefreshToken(jwtPayload);
  return { access, refresh };
}

export function generateAccessToken(jwtPayload: JwtPayload) {
  const access = jwt.sign({ ...jwtPayload, expiresIn: 60 * 60 * 24 }, env.JWT_SECRET);
  return access;
}

export function generateRefreshToken(jwtPayload: JwtPayload) {
  const refresh = jwt.sign({ ...jwtPayload, expiresIn: 60 * 60 * 24 * 7 }, env.REFRESH_TOKEN_SECRET);
  return refresh;
}

export function verifyRefreshToken(refresh: string) {
  const jwtPayload = jwt.verify(refresh, env.REFRESH_TOKEN_SECRET) as JwtPayload;
  return jwtPayload;
}
