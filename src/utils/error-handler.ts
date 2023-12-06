import { Request, Response } from 'express';
import pg from 'pg';

export class AppError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad request') {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not found') {
    super(message, 404);
  }
}

function handleDatabaseError(err: pg.DatabaseError, res: Response) {
  switch (err.code) {
    case '23505':
      res.status(409).json({ error: err.detail });
      break;
    // TODO: Add other error codes
    default:
      res.status(500).json({ error: 'Database error' });
  }
}

export const errorHandler = (err: Error, _req: Request, res: Response) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
  } else if (err instanceof pg.DatabaseError) {
    handleDatabaseError(err, res);
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
};
