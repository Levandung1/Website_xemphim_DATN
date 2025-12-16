import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-black text-red-600 cursor-pointer"
        >
          MY MOVIE
        </div>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <span onClick={() => navigate("/")} className="cursor-pointer hover:text-white">
            Trang chủ
          </span>
          <span onClick={() => navigate("/series")} className="cursor-pointer hover:text-white">
            Series
          </span>
          <span onClick={() => navigate("/movies")} className="cursor-pointer hover:text-white">
            Phim
          </span>
          <span onClick={() => navigate("/new")} className="cursor-pointer hover:text-white">
            Mới & Phổ biến
          </span>
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-300 text-sm">👤 {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-lg text-sm font-bold"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-gray-300 hover:text-white text-sm"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-lg text-sm font-bold"
              >
                Đăng ký
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
