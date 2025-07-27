import express from 'express';
const router = express.Router();
import { 
    addPatients, 
    getPatients,
    getPatient,
    updatePatient,
    deletePatient 
} from '../controllers/patientControllers.js';
import checkAuth from '../middleware/authMiddleware.js';



router.route('/')
    .post(checkAuth, addPatients)
    .get(checkAuth ,getPatients)

router
    .route('/:id')
    .get(checkAuth, getPatient)
    .put(checkAuth, updatePatient)
    .delete(checkAuth, deletePatient)

export default router;
