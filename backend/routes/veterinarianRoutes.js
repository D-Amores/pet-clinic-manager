import express from 'express';
const router = express.Router();
import { resgister, profile } from '../controllers/veterinarianControllers.js';

router.post('/', resgister);

router.get('/profile', profile)

export default router;
