import { Router } from 'express';
import * as formController from '../controllers/forms.controller.js';

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

// Submit a form
router.post('/:id/submit', formController.submitForm);

export default router;
