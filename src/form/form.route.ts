import { Router } from 'express';
import * as formController from '@/form/form.controller';

const router = Router();

// GET all forms
router.get('/', formController.getUsers);

// GET a single form by id
router.get('/:id', formController.getUserById);

// POST a new form
router.post('/', formController.createUser);

// PUT to update a form
router.put('/:id', formController.updateUser);

// DELETE a form
router.delete('/:id', formController.deleteUser);

export default router;
