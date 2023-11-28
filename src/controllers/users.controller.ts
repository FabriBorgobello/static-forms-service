import { db } from '@/database';
import { Request, Response } from 'express';

// List
export const getUsers = async (_req: Request, res: Response) => {
  const users = await db('users').select('*');
  res.json(users);
};

// Retrieve
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await db('users').where({ id }).first();
  res.json(user);
};

// Create
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await db('users').insert({ name, email, password }).returning('*');
  res.json(user);
};

// Update
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const user = await db('users').where({ id }).update({ name, email, password }).returning('*');
  res.json(user);
};

// Delete
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await db('users').where({ id }).delete();
  res.status(204).send();
};
