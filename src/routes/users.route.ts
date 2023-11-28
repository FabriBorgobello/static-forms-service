import { Router } from 'express';
import * as userController from '../controllers/users.controller.js';

const router = Router();

// GET all users
router.get('/', userController.getUsers);

// GET a single user by id
router.get('/:id', userController.getUserById);

// POST a new user
router.post('/', userController.createUser);

// PUT to update a user
router.put('/:id', userController.updateUser);

// DELETE a user
router.delete('/:id', userController.deleteUser);

export default router;
