import { Router } from 'express';
import * as authController from '@/auth/auth.controller';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/token', authController.token);
router.post('/logout', authController.logout);

router.get('/google', authController.google);
router.get('/google/callback', authController.googleCallback);

export default router;
