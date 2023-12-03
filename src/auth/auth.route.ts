import { Router } from 'express';
import * as authController from '@/auth/auth.controller';

const router = Router();

// JWT
router.post('/token', authController.token);
router.post('/logout', authController.logout);

// Local
router.post('/register', authController.register);
router.post('/login', authController.login);

// Google OAuth2
router.get('/google', authController.google);
router.get('/google/callback', authController.googleCallback);

export default router;
