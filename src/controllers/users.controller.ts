import { Request, Response } from 'express';
import { type User } from '../models/users.model.js';

let users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@email.com',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'janedoe@email.com',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// List
export const getUsers = (_req: Request, res: Response) => {
  res.status(200).json(users);
};

// Retrieve
export const getUserById = (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const foundUser = users.find((user) => user.id === userId);
  if (foundUser) {
    res.status(200).json(foundUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// Create
export const createUser = (req: Request, res: Response) => {
  const newUser: User = req.body;
  users.push(newUser);
  res.status(201).json({ message: 'User added', user: newUser });
};

// Update
export const updateUser = (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex > -1) {
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.status(200).json({ message: 'User updated', user: users[userIndex] });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// Delete
export const deleteUser = (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const newUserList = users.filter((user) => user.id !== userId);
  if (newUserList.length !== users.length) {
    users = newUserList;
    res.status(200).json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
