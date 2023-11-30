import { Router } from 'express';
import * as authController from '@/auth/auth.controller';

const router = Router();

router.post('/signin', authController.signIn);
router.post('/signup', authController.signUp);
router.post('/signout', authController.signOut);

export default router;
