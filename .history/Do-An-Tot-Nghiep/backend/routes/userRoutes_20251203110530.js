import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // ẩn mật khẩu
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});

export default router;
