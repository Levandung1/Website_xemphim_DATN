import express from 'express';
import { register, login, getCurrentUser, registerAdmin } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post("/register", registerAdmin);
router.get('/me', verifyToken, getCurrentUser);

export default router;
