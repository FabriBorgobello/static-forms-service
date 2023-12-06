import { db } from '@/database';
import { NextFunction, Request, Response } from 'express';
import { FORM_PUBLIC_FIELDS } from './form.model';
import invariant from 'tiny-invariant';
import { NotFoundError } from '@/utils/error-handler';

// List
export const getForms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    invariant(user, 'User must be authenticated');
    const forms = await db
      .selectFrom('form')
      .select(FORM_PUBLIC_FIELDS)
      .where('user_id', '=', user.id)
      .execute();
    res.status(200).json(forms);
  } catch (error) {
    next(error);
  }
};

// Retrieve
export const getFormById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const { id } = req.params;
    invariant(user, 'User must be authenticated');
    invariant(id, 'Form id must be provided');

    const form = await db
      .selectFrom('form')
      .select(FORM_PUBLIC_FIELDS)
      .where('user_id', '=', user.id)
      .where('id', '=', Number(id))
      .executeTakeFirst();

    if (!form) throw new NotFoundError();

    res.status(200).json(form);
  } catch (error) {
    next(error);
  }
};

// Create
export const createForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const { title, description } = req.body;
    invariant(user, 'User must be authenticated');

    const form = await db
      .insertInto('form')
      .values({ title, description, user_id: user.id })
      .returning(FORM_PUBLIC_FIELDS)
      .executeTakeFirst();

    res.status(201).json(form);
  } catch (error) {
    next(error);
  }
};

// Update
export const updateForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const { title, description } = req.body;
    invariant(user, 'User must be authenticated');

    const form = await db
      .updateTable('form')
      .set({ title, description, updated_at: new Date() })
      .where('user_id', '=', user.id)
      .where('id', '=', Number(req.params.id))
      .returning(FORM_PUBLIC_FIELDS)
      .executeTakeFirst();

    if (!form) throw new NotFoundError();

    res.status(200).json(form);
  } catch (error) {
    next(error);
  }
};

// Delete
export const deleteForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    invariant(user, 'User must be authenticated');

    const { numDeletedRows } = await db
      .deleteFrom('form')
      .where('user_id', '=', user.id)
      .where('id', '=', Number(req.params.id))
      .executeTakeFirst();

    if (!numDeletedRows) throw new NotFoundError();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
