import express from 'express';
import { getAllUsers, deleteUser, deleteReview, registerAdmin, adminLogin } from '../controllers/adminController.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();
router.post("/register", registerAdmin);
router.post('/login', adminLogin);
router.use(verifyToken);
router.use(verifyAdmin);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.delete('/reviews/:id', deleteReview);

export default router;