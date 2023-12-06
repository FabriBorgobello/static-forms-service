import { z } from 'zod';
import { ENVIRONMENTS, USER_ROLES } from './constants';
import { User as UserTable } from './user/user.model';

export const environmentSchema = z.enum(ENVIRONMENTS);
export type Environment = z.infer<typeof environmentSchema>;

export const userRoleSchema = z.enum(USER_ROLES);
export type UserRole = z.infer<typeof userRoleSchema>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User extends UserTable {}
  }
}
