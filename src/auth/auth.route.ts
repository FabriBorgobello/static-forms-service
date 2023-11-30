import { Router } from 'express';
import * as authController from '@/auth/auth.controller';

const router = Router();

router.post('/login', authController.login);
router.get('/google', authController.googleSignIn);
router.get('/google/callback', authController.googleSignInCallback);

export default router;
