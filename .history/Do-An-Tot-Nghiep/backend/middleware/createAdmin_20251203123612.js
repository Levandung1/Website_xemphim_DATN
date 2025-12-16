import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const username = "admin";
        const password = "123456";

        const hashed = await bcrypt.hash(password, 10);

        const admin = new Admin({ username, password: hashed });

        await admin.save();

        console.log("✅ Admin created successfully:");
        console.log("Username:", username);
        console.log("Password:", password);

        process.exit();
    } catch (err) {
        console.error("❌ Error creating admin:", err);
        process.exit(1);
    }
};

createAdmin();
