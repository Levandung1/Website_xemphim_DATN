import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Review', reviewSchema);