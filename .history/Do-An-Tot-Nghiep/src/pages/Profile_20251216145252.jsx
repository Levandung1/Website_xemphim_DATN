import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({
        username: "",
        email: "",
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("user"));
        if (u) {
            setUser(u);
            setForm({
                username: u.username || "",
                email: u.email || "",
            });
        }
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(
                "http://localhost:5000/api/users/profile",
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // cập nhật localStorage
            localStorage.setItem("user", JSON.stringify(res.data));
            alert("✅ Cập nhật thành công");
        } catch (err) {
            console.error(err);
            alert("❌ Cập nhật thất bại");
        }
    };

    if (!user) return null;

    return (
        <div className="bg-[#0a0a0a] text-white min-h-screen pt-16">
            <Navbar />

            <div className="max-w-xl mx-auto px-6 py-20">
                <h1 className="text-3xl font-black mb-8">👤 Trang cá nhân</h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-[#161616] border border-white/10 rounded-xl p-6 space-y-5"
                >
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Tên người dùng
                        </label>
                        <input
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Email
                        </label>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold"
                    >
                        Lưu thay đổi
                    </button>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;
