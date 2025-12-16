import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

const createAdmin = async () => {
    try {
        console.log("🔌 Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);

        const username = "admin";
        const password = "123456"; // có thể đổi nếu muốn

        console.log("🔐 Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);

        const adminExists = await Admin.findOne({ username });
        if (adminExists) {
            console.log("⚠️ Admin đã tồn tại!");
            process.exit();
        }

        const admin = new Admin({
            username,
            password: hashedPassword,
        });

        await admin.save();

        console.log("\n🎉 ADMIN CREATED SUCCESSFULLY!");
        console.log("📌 Username:", username);
        console.log("📌 Password:", password);
        console.log("📌 Bạn có thể đăng nhập ngay bằng tài khoản này.\n");

        process.exit();

    } catch (err) {
        console.error("❌ ERROR:", err);
        process.exit(1);
    }
};

createAdmin();
