import express from 'express';
import { register, login, getCurrentUser} from '../controllers/authController.js';
import { verifyAdmin, verifyToken } from '../middleware/auth.js';
import { getAllReviews } from '../controllers/adminController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/reviews',verifyAdmin, getAllReviews);
router.get('/me', verifyToken, getCurrentUser);

export default router;
