import { Router } from 'express';
import * as formController from '@/form/form.controller';

const router = Router();

// GET all forms
router.get('/', formController.getForms);

// GET a single form by id
router.get('/:id', formController.getFormById);

// POST a new form
router.post('/', formController.createForm);

// PUT to update a form
router.put('/:id', formController.updateForm);

// DELETE a form
router.delete('/:id', formController.deleteForm);

export default router;
