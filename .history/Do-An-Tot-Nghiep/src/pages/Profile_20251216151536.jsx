import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({
        username: "",
        email: "",
        phone: "",
        birthday: "",
        address: "",
        avatar: "",
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("user"));
        if (u) {
            setUser(u);
            setForm({
                username: u.username || "",
                email: u.email || "",
                phone: u.phone || "",
                birthday: u.birthday ? u.birthday.slice(0, 10) : "",
                address: u.address || "",
                avatar: u.avatar || "",
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

            localStorage.setItem("user", JSON.stringify(res.data));
            setUser(res.data);
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

            <div className="max-w-2xl mx-auto px-6 py-20">
                <h1 className="text-3xl font-black mb-8">👤 Trang cá nhân</h1>

                {/* AVATAR */}
                <div className="flex items-center gap-6 mb-8">
                    <img
                        src={form.avatar}
                        alt="avatar"
                        className="w-24 h-24 rounded-full object-cover border border-white/20"
                    />
                    <input
                        name="avatar"
                        value={form.avatar}
                        onChange={handleChange}
                        placeholder="URL Avatar"
                        className="flex-1 bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-sm"
                    />
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-[#161616] border border-white/10 rounded-xl p-6 space-y-5"
                >
                    <Input label="Tên người dùng" name="username" value={form.username} onChange={handleChange} />
                    <Input label="Email" name="email" value={form.email} onChange={handleChange} />
                    <Input label="Số điện thoại" name="phone" value={form.phone} onChange={handleChange} />
                    <Input type="date" label="Ngày sinh" name="birthday" value={form.birthday} onChange={handleChange} />
                    <Input label="Địa chỉ" name="address" value={form.address} onChange={handleChange} />

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

const Input = ({ label, ...props }) => (
    <div>
        <label className="block text-sm text-gray-400 mb-1">{label}</label>
        <input
            {...props}
            className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3"
        />
    </div>
);

export default Profile;
