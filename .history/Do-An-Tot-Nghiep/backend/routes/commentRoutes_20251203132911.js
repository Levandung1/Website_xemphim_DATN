import express from 'express';
import { 
  getCommentsByMovie, 
  deleteComment, 
  updateComment,
  likeComment,
  createComment,
  getAllComments,
} from '../controllers/commentController.js';
import { verifyAdmin, verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/movie/:movieId', getCommentsByMovie);
router.get('/', verifyToken, verifyAdmin, getAllComments);
// Protected routes (require authentication)
router.post('/', verifyToken, createComment);
router.delete('/:commentId', verifyToken,verifyAdmin, deleteComment);
router.put('/:commentId', verifyToken, updateComment);
router.post('/:commentId/like', verifyToken, likeComment);

export default router;
