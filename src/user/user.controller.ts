import { db } from '@/database';
import { encryptPassword } from '@/utils/crypto';
import { NotFoundError } from '@/utils/error-handler';
import { NextFunction, Request, Response } from 'express';
import { USER_PUBLIC_FIELDS } from './user.model';

function getUsersSafely() {
  return db.selectFrom('user').select(USER_PUBLIC_FIELDS);
}

// List
export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getUsersSafely().execute();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Retrieve
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await getUsersSafely().where('id', '=', Number(id)).executeTakeFirst();
    if (!user) throw new NotFoundError();
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Create
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const { hash, salt } = encryptPassword(password);
    const user = await db
      .insertInto('user')
      .values({
        name,
        email,
        hash,
        salt,
      })
      .returning(USER_PUBLIC_FIELDS)
      .executeTakeFirst();

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Update
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await db
      .updateTable('user')
      .set({ name, email, updated_at: new Date() })
      .where('id', '=', Number(id))
      .returning(USER_PUBLIC_FIELDS)
      .executeTakeFirst();

    if (!user) throw new NotFoundError();
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Delete
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { numDeletedRows } = await db.deleteFrom('user').where('id', '=', Number(id)).executeTakeFirst();
    if (!numDeletedRows) throw new NotFoundError();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
