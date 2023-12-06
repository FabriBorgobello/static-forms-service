import { Router } from 'express';
import * as submissionController from '@/submission/submission.controller';
import { authenticated } from '@/auth/middlewares';

const router = Router({ mergeParams: true });
// mergeParams: true allows us to access the form_id param from the parent router

// GET all submissions
router.get('/', authenticated, submissionController.getSubmissionsByForm);

// GET a single submission by id
router.get('/:id', authenticated, submissionController.getSubmissionById);

// POST a new submission
router.post('/', submissionController.createSubmission);

// DELETE a submission
router.delete('/:id', authenticated, submissionController.deleteSubmission);

export default router;
