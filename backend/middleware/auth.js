import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';
export const verifyToken = async (req, res, next) => {
  try {
    let token;

    // console.log("HEADER RECEIVED:", req.headers.authorization);

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // console.log("TOKEN RECEIVED:", token);

    if (!token) {
      return res.status(401).json({ message: "Không tìm thấy token" });
    }

    // Decode thử không catch
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("DECODED TOKEN:", decoded);

    let account = await User.findById(decoded.id).select("-password");
    if (!account) {
      account = await Admin.findById(decoded.id).select("-password");
    }

    if (!account) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }

    req.user = account;
    next();

  } catch (error) {
    console.error("AUTH ERROR:", error);
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};
export const verifyAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Chỉ admin mới được phép!" });
};