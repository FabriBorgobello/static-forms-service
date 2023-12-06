import { db } from '@/database';
import { NotFoundError } from '@/utils/error-handler';
import { NextFunction, Request, Response } from 'express';
import { USER_PUBLIC_FIELDS } from './user.model';
import { calculatePagination } from '@/utils/pagination';

function getUsersSafely() {
  return db.selectFrom('user').select(USER_PUBLIC_FIELDS);
}

// List
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Pagination parameters
    const page = Number(req.query.page) >= 1 ? Number(req.query.page) : 1;
    const limit = Number(req.query.limit) >= 1 ? Number(req.query.limit) : 10;

    // Get total count of users for pagination metadata
    const { count } = await db
      .selectFrom('user')
      .select(db.fn.countAll().as('count'))
      .executeTakeFirstOrThrow();
    // Retrieve users with pagination
    const users = await getUsersSafely()
      .limit(limit)
      .offset((page - 1) * limit)
      .execute();

    const pagination = calculatePagination(req, Number(count), limit, page);

    res.json({ ...pagination, results: users });
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
    const { numDeletedRows } = await db
      .deleteFrom('user')
      .where('id', '=', Number(id))
      .executeTakeFirst();
    if (!numDeletedRows) throw new NotFoundError();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
