import express from 'express';
const router = express.Router();
import { resgister, profile, confirm, authenticate } from '../controllers/veterinarianControllers.js';
import checkAuth from '../middleware/authMiddleware.js';




router.post('/', resgister);
router.get('/confirm/:token', confirm);
router.post('/login', authenticate);


router.get('/profile', checkAuth, profile);

export default router;
