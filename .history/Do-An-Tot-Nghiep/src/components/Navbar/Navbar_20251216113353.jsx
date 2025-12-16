const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

        <div
          className="text-2xl font-black text-red-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          MY MOVIE
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          {["Trang chủ", "Series", "Phim", "Mới & Phổ biến"].map((item, i) => (
            <span
              key={i}
              onClick={() => navigate(i === 0 ? "/" : "/movies")}
              className="cursor-pointer hover:text-white transition"
            >
              {item}
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-300 text-sm">👤 {user.username}</span>
              <button className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-lg text-sm font-bold">
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <button className="text-gray-300 hover:text-white text-sm">Đăng nhập</button>
              <button className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-lg text-sm font-bold">
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