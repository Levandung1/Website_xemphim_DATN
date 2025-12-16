import User from '../models/User.js';
import Review from '../models/Review.js';

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};

export const getAllReviews = async (req, res) => {
  const reviews = await Review.find().populate('user movie');
  res.json(reviews);
};

export const deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: 'Review deleted' });
};