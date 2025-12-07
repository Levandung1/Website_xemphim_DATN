import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, Play, Info } from "lucide-react";

const API_URL = "http://localhost:5000/api/movies";

// --- MovieRow Component ---
const MovieRow = ({ title, data }) => {
  const navigate = useNavigate();
  if (!data || data.length === 0) return null;

  return (
    <div className="mt-32 px-8 md:px-20">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 transition-colors hover:text-red-500 cursor-default">
        {title}
      </h2>
      <div className="flex overflow-x-scroll gap-6 scrollbar-hide scroll-smooth py-6">
        {data.map((movie) => (
          <div
            key={movie._id}
            className="flex-shrink-0 w-[180px] sm:w-[220px] md:w-[280px] cursor-pointer group relative transition-all duration-300 hover:scale-110 hover:z-10 shadow-2xl"
            onClick={() => navigate(`/movie/${movie._id}`)}
          >
            <div className="w-full h-[270px] sm:h-[330px] md:h-[420px] rounded-lg overflow-hidden transition-all duration-300">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <span className="bg-red-600 px-6 py-3 rounded-full text-white font-bold text-xl hover:bg-red-700 transition-colors">
                  Xem ngay
                </span>
              </div>
            </div>
            <p className="mt-4 text-lg md:text-xl text-gray-300 truncate text-center font-medium group-hover:text-white transition-colors">
              {movie.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Movies Component ---
const Movies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [search, setSearch] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(API_URL);
      const allMovies = res.data;
      setMovies(allMovies);

      if (allMovies.length > 0) {
        const topMovies = allMovies.slice(0, 5);
        const random = Math.floor(Math.random() * topMovies.length);
        setHeroMovie(topMovies[random]);
      }
    } catch (err) {
      console.error("Lỗi khi tải phim:", err);
    }
  };

  const fetchSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return fetchMovies();

    try {
      const res = await axios.get(`${API_URL}/search`, {
        params: { query: search },
      });
      setMovies(res.data);
      if (res.data.length === 0) setHeroMovie(null);
    } catch (err) {
      console.error("Lỗi khi tìm kiếm:", err);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    fetchMovies();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white relative">
      {/* Navbar */}
      <header
        className={`fixed w-full z-50 px-8 md:px-20 py-5 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "bg-black shadow-2xl" : "bg-gradient-to-b from-black/95 to-transparent"
        }`}
      >
        {/* Logo màu đỏ chuẩn Netflix */}
        <h1
          className="text-4xl md:text-5xl font-extrabold text-[#E50914] cursor-pointer hover:text-red-400 transition-colors"
          onClick={() => navigate("/")}
        >
          MY MOVIE
        </h1>

        {/* Menu */}
        <nav className="hidden lg:flex gap-12 text-white text-2xl font-medium">
          <a href="#" className="hover:text-gray-300 transition text-red-600 font-semibold">Trang chủ</a>
          <a href="#" className="hover:text-gray-300 transition">Phim T.Hình</a>
          <a href="#" className="hover:text-gray-300 transition">Phim</a>
          <a href="#" className="hover:text-gray-300 transition">Mới Thêm</a>
          <a href="#" className="hover:text-gray-300 transition">Danh sách của tôi</a>
        </nav>

        {/* Search & Profile */}
        <div className="flex items-center gap-8">
          <form onSubmit={fetchSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Tìm kiếm phim..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`bg-black/90 border-2 border-white/70 text-white text-xl pl-4 pr-6 py-2 rounded-sm outline-none transition-all duration-300 ${
                isSearchOpen ? "w-72 opacity-100 border-white" : "w-0 opacity-0"
              }`}
            />
            <button
              type={isSearchOpen ? "submit" : "button"}
              onClick={() => { if (!isSearchOpen) setIsSearchOpen(true); }}
              className={`p-1 ${isSearchOpen ? "ml-4" : "ml-0"}`}
            >
              <Search className="text-white w-7 h-7 cursor-pointer hover:text-red-500 transition-colors" />
            </button>
          </form>

          <span className="text-xl font-semibold hidden sm:block hover:text-gray-300 cursor-pointer transition-colors">TRẺ EM</span>
          <div className="w-10 h-10 bg-red-600 rounded-md cursor-pointer hover:opacity-80 transition-opacity"></div>
        </div>
      </header>

      {/* Hero Banner */}
      {heroMovie && (
        <section className="relative h-[80vh] w-full pt-24">
          <img
            src={heroMovie.posterUrl}
            alt={heroMovie.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60"></div>

          <div className="absolute bottom-[15%] left-8 md:left-20 max-w-2xl md:max-w-4xl">
            <h1 className="text-8xl md:text-[10rem] font-extrabold leading-none drop-shadow-4xl">
              {heroMovie.title}
            </h1>
            <p className="text-gray-200 mt-8 text-xl md:text-3xl line-clamp-3 drop-shadow-xl">
              {heroMovie.description}
            </p>
            <div className="flex gap-8 mt-12">
              <button
                onClick={() => navigate(`/movie/${heroMovie._id}`)}
                className="bg-white text-black font-bold px-12 py-5 rounded-lg flex items-center gap-4 text-3xl hover:bg-gray-300 transition-colors shadow-3xl"
              >
                <Play className="w-8 h-8" fill="black" /> Phát
              </button>
              <button className="bg-gray-500/80 text-white font-bold px-12 py-5 rounded-lg flex items-center gap-4 text-3xl hover:bg-gray-600/80 transition-colors shadow-3xl">
                <Info className="w-8 h-8" /> Thêm Thông tin
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Movie Rows */}
      <main className="relative z-20 mt-0 pb-48">
        <MovieRow title="Phim bom tấn hành động Âu - Mỹ" data={movies.slice(0, 15)} />
        <MovieRow title="Chương trình truyền hình mới nhất" data={movies.slice(5, 20)} />
        <MovieRow title="Gợi ý hàng đầu cho bạn" data={movies.slice(10, 25)} />
        <MovieRow title="Phim chỉ có trên Netflix" data={movies.slice(15, 30)} />
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-32 text-sm border-t border-gray-900 px-8 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-left text-gray-400 text-xl">
          <a href="#" className="hover:underline">Điều khoản dịch vụ</a>
          <a href="#" className="hover:underline">Trung tâm trợ giúp</a>
          <a href="#" className="hover:underline">Việc làm</a>
          <a href="#" className="hover:underline">Tuỳ chọn cookie</a>
          <a href="#" className="hover:underline">Thẻ quà tặng</a>
          <a href="#" className="hover:underline">Quan hệ nhà đầu tư</a>
          <a href="#" className="hover:underline">Thông tin công ty</a>
          <a href="#" className="hover:underline">Liên hệ với chúng tôi</a>
        </div>
        <p className="text-gray-500 mt-12 text-xl">Giao diện thiết kế theo Netflix chuẩn 2024 © NETFLIX CLONE.</p>
      </footer>

      {/* Scrollbar hide */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Movies;
