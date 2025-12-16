import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';
export const verifyToken = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ message: "Không tìm thấy token" });
    }
    // Giải mã token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Tìm trong bảng User trước
    let account = await User.findById(decoded.id).select("-password");
    // Nếu không tìm thấy → thử bảng Admin
    if (!account) {
      account = await Admin.findById(decoded.id).select("-password");
    }

    if (!account) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    // Gán vào req.user
    req.user = account;

    next();

  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};
export const verifyAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Chỉ admin mới được phép!" });
};