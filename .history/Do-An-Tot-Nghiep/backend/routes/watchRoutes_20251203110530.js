import express from 'express';
import { getAllWatchHistory, addWatchHistory, updateWatchHistory, getUserWatchHistory } from '../controllers/watchHistoryController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllWatchHistory);
router.post('/', addWatchHistory);

// Cập nhật lịch sử xem
router.post('/history', verifyToken, updateWatchHistory);

// Lấy lịch sử xem của người dùng
router.get('/history/:userId', verifyToken, getUserWatchHistory);

export default router;
