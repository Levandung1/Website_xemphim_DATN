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
// Protected routes (require authentication)
router.post('/', verifyToken, createComment);
router.get('/comments',verifyAdmin, getAllComments);
router.delete('/:commentId', verifyToken, deleteComment);
router.put('/:commentId', verifyToken, updateComment);
router.post('/:commentId/like', verifyToken, likeComment);

export default router;
