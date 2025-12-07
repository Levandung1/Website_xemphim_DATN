import User from '../models/User.js';
import Review from '../models/Review.js';
import Admin from '../models/Admin.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
export const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra username trùng
    const exist = await Admin.findOne({ username });
    if (exist) {
      return res.status(400).json({ message: "Admin đã tồn tại" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo admin mới
    const admin = new Admin({
      username,
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();

    res.status(201).json({
      message: "Tạo admin thành công!",
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });

  } catch (err) {
    console.error("Register admin error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
// Đăng nhập ADMIN
export const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ message: 'Admin không tồn tại' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: 'Sai mật khẩu Admin' });

  const token = jwt.sign({ id: admin._id, username: admin.username, role: 'admin' }, process.env.JWT_SECRET);

  res.json({ token, admin: { id: admin._id, username: admin.username } });
};
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