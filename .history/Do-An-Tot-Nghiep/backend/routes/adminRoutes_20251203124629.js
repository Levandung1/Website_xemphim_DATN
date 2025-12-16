import express from 'express';
import { getAllUsers, deleteUser, getAllReviews, deleteReview, registerAdmin } from '../controllers/adminController.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyToken);
router.use(verifyAdmin);

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.post("/register", registerAdmin);
router.get('/reviews', getAllReviews);
router.delete('/reviews/:id', deleteReview);

export default router;