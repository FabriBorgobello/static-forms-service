import { db } from '@/database';
import { generateHash } from '@/utils/crypto';
import { NotFoundError } from '@/utils/error-handler';
import { NextFunction, Request, Response } from 'express';

const publicFields = ['id', 'name', 'email', 'created_at', 'updated_at'];

// List
export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await db('users').select(publicFields);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Retrieve
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await db('users').where({ id }).first().select(publicFields);
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
    const [user] = await db('users').insert({ name, email, hash, salt }).returning(publicFields);
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
    const [user] = await db('users').where({ id }).update({ name, email }).returning(publicFields);
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
