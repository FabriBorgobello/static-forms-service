import { Router } from 'express';
import * as authController from '@/auth/auth.controller';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/token', authController.token);
router.post('/logout', authController.logout);

export default router;
