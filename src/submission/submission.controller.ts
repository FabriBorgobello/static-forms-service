import { db } from '@/database';
import { NotFoundError } from '@/utils/error-handler';
import { NextFunction, Request, Response } from 'express';
import invariant from 'tiny-invariant';

// List
export const getSubmissionsByForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const { form_id } = req.params;

    invariant(user, 'User must be authenticated');
    invariant(!isNaN(Number(form_id)), 'Form ID must be a valid number');

    const form = await db
      .selectFrom('form')
      .select('id')
      .where('user_id', '=', user.id)
      .where('id', '=', Number(form_id))
      .executeTakeFirst();

    if (!form) throw new NotFoundError();

    const submissions = await db.selectFrom('submission').selectAll().where('form_id', '=', Number(form_id)).execute();

    res.status(200).json(submissions);
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

// Retrieve
export const getSubmissionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const { form_id, id } = req.params;

    invariant(user, 'User must be authenticated');
    invariant(!isNaN(Number(form_id)), 'Form ID must be a valid number');
    invariant(!isNaN(Number(id)), 'Submission ID must be a valid number');

    // Check if user has access to form
    const form = await db
      .selectFrom('form')
      .select('id')
      .where('user_id', '=', user.id)
      .where('id', '=', Number(form_id))
      .executeTakeFirst();

    if (!form) throw new NotFoundError();

    const submission = await db
      .selectFrom('submission')
      .selectAll()
      .where('form_id', '=', Number(form_id))
      .where('id', '=', Number(id))
      .executeTakeFirst();

    if (!submission) throw new NotFoundError();

    res.status(200).json(submission);
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

// Create
export const createSubmission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { form_id } = req.params;

    invariant(!isNaN(Number(form_id)), 'Form ID must be a valid number');

    const submission = await db
      .insertInto('submission')
      .values({
        form_id: Number(form_id),
        submitted_data: req.body,
      })
      .returningAll()
      .executeTakeFirst();

    res.status(201).json(submission);
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

// Delete
export const deleteSubmission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const { form_id, id } = req.params;

    invariant(user, 'User must be authenticated');
    invariant(!isNaN(Number(form_id)) && !isNaN(Number(id)), 'Invalid form ID or submission ID');

    // Check if user has access to form
    const form = await db
      .selectFrom('form')
      .select('id')
      .where('user_id', '=', user.id)
      .where('id', '=', Number(form_id))
      .executeTakeFirst();

    if (!form) throw new NotFoundError('Form not found or access denied');

    const { numDeletedRows } = await db
      .deleteFrom('submission')
      .where('form_id', '=', Number(form_id))
      .where('id', '=', Number(id))
      .executeTakeFirst();

    if (Number(numDeletedRows) === 0) throw new NotFoundError('Submission not found or access denied');

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
