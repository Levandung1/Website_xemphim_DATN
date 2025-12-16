import Comment from '../models/Comment.js';
import Movie from '../models/Movie.js';

// Lấy tất cả bình luận
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy tất cả bình luận của một phim
export const getCommentsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const comments = await Comment.find({ movieId })
      .sort({ createdAt: -1 }); // Sắp xếp theo thời gian mới nhất
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error getting comments:', error);
    res.status(500).json({ message: 'Error getting comments' });
  }
};



// Xóa bình luận
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id; // Lấy từ middleware verifyToken

    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Kiểm tra quyền xóa (chỉ user tạo comment hoặc admin mới được xóa)
    if (comment.user.toString() !== userId.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Error deleting comment' });
  }
};

// Cập nhật bình luận
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Kiểm tra quyền sửa (chỉ user tạo comment mới được sửa)
    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { 
        content,
        isEdited: true
      },
      { new: true }
    ).populate('user', 'username');

    res.status(200).json(updatedComment);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ message: 'Error updating comment' });
  }
};

// Thích bình luận
export const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { $inc: { likes: 1 } },
      { new: true }
    ).populate('user', 'username');

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error('Error liking comment:', error);
    res.status(500).json({ message: 'Error liking comment' });
  }
};

// Tạo bình luận mới
export const createComment = async (req, res) => {
  try {
    const { movieId, content } = req.body;
    
    // Lấy thông tin user từ middleware auth
    const userId = req.user._id;
    const userName = req.user.username;

    const comment = new Comment({
      movieId,
      userId,
      userName,
      content
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Error creating comment' });
  }
};
