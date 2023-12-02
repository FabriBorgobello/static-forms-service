import { Router } from 'express';
import * as userController from '@/user/user.controller';

const router = Router();

// GET all users
router.get('/', userController.getUsers);

// GET a single user by id
router.get('/:id', userController.getUserById);

// PUT to update a user
router.put('/:id', userController.updateUser);

// DELETE a user
router.delete('/:id', userController.deleteUser);

export default router;
