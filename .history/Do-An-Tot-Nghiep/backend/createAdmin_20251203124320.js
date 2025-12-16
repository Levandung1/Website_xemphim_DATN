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
        const password = "123456";

        console.log("🔐 Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);

        const exist = await Admin.findOne({ username });
        if (exist) {
            console.log("⚠️ Admin đã tồn tại!");
            process.exit();
        }

        const admin = new Admin({
            username,
            password: hashedPassword,
        });

        await admin.save();

        console.log("🎉 Admin created:");
        console.log("Username:", username);
        console.log("Password:", password);

        process.exit();
    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
};

createAdmin();
