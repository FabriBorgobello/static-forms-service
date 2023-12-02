import { Router } from 'express';
import * as submissionController from '@/submission/submission.controller';

const router = Router();

// GET all submissions
router.get('/', submissionController.getSubmissions);

// GET a single submission by id
router.get('/:id', submissionController.getSubmissionById);

// POST a new submission
router.post('/', submissionController.createSubmission);

// PUT to update a submission
router.put('/:id', submissionController.updateSubmission);

// DELETE a submission
router.delete('/:id', submissionController.deleteSubmission);

export default router;
