import { db } from '@/database';
import { generateHash } from '@/utils/crypto';
import { NotFoundError } from '@/utils/error-handler';
import { NextFunction, Request, Response } from 'express';

export const USER_PUBLIC_FIELDS = ['id', 'name', 'email', 'created_at', 'updated_at'];

// List
export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await db('users').select(USER_PUBLIC_FIELDS);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Retrieve
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await db('users').where({ id }).first().select(USER_PUBLIC_FIELDS);
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
    const { hash, salt } = generateHash(password);
    const [user] = await db('users').insert({ name, email, hash, salt }).returning(USER_PUBLIC_FIELDS);
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
    const [user] = await db('users').where({ id }).update({ name, email }).returning(USER_PUBLIC_FIELDS);
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
    const user = await db('users').where({ id }).delete();
    if (!user) throw new NotFoundError();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
