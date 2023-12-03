import { Router } from 'express';
import * as formController from '@/form/form.controller';
import { authenticated } from '@/auth/middlewares';

const router = Router();

// GET all forms
router.get('/', authenticated, formController.getForms);

// GET a single form by id
router.get('/:id', authenticated, formController.getFormById);

// POST a new form
router.post('/', authenticated, formController.createForm);

// PUT to update a form
router.put('/:id', authenticated, formController.updateForm);

// DELETE a form
router.delete('/:id', authenticated, formController.deleteForm);

export default router;
