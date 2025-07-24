import express from 'express';
const router = express.Router();
import { resgister, profile, confirm, authenticate, forgotPassword, checkToken, newPassword } from '../controllers/veterinarianControllers.js';
import checkAuth from '../middleware/authMiddleware.js';

// public area
router.post('/', resgister);
router.get('/confirm/:token', confirm);
router.post('/login', authenticate);
router.post('/forgot-password', forgotPassword);
router.route('/forgot-password/:token').get(checkToken).post(newPassword);

// private area
router.get('/profile', checkAuth, profile);

export default router;
