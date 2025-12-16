import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Play,
  Info,
  Compass,
  TrendingUp,
  Home,
  Heart,
  Menu,
  X,
  Star
} from "lucide-react";

const API_URL = "http://localhost:5000/api/movies";

const Movies = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // =============================
  // API LOGIC (GIỮ NGUYÊN)
  // =============================
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setMovies(res.data);
      if (res.data.length > 0 && !heroMovie) {
        const random = Math.floor(Math.random() * res.data.length);
        setHeroMovie(res.data[random]);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const fetchTrending = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/trending`);
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const fetchByGenre = async (genreName) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/genre/${genreName}`);
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
        fetchMovies(); 
        return;
    }
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/search`, { params: { query: search } });
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // =============================
  // MODERN UI COMPONENTS
  // =============================

  // 1. Sidebar Navigation (Left)
  const Sidebar = () => (
    <>
      {/* Mobile Toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-neutral-800 rounded-full text-white shadow-lg">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Content */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-24 bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-white/5 flex flex-col items-center py-8 transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-10 w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Play className="text-white fill-white w-5 h-5" />
        </div>

        <nav className="flex flex-col gap-8 w-full items-center">
            <NavItem icon={<Home size={22} />} active={genre === 'All' && !search} onClick={() => { setGenre("All"); setSearch(""); fetchMovies(); }} />
            <NavItem icon={<TrendingUp size={22} />} onClick={fetchTrending} />
            <NavItem icon={<Compass size={22} />} />
            <NavItem icon={<Heart size={22} />} />
        </nav>

        <div className="mt-auto">
             <img src="https://i.pravatar.cc/100" alt="User" className="w-10 h-10 rounded-full border-2 border-neutral-700 cursor-pointer hover:border-purple-500 transition" />
        </div>
      </aside>
    </>
  );

  const NavItem = ({ icon, active, onClick }) => (
    <button 
        onClick={onClick}
        className={`p-3 rounded-2xl transition-all duration-300 group relative ${active ? 'bg-white text-black shadow-lg scale-110' : 'text-gray-500 hover:bg-neutral-800 hover:text-white'}`}
    >
        {icon}
        {active && <span className="absolute right-[-8px] top-[-4px] w-3 h-3 bg-purple-500 rounded-full border-2 border-black"></span>}
    </button>
  );

  // 2. Modern Movie Card
  const ModernCard = ({ movie }) => (
    <div 
        onClick={() => navigate(`/movie/${movie._id}`)}
        className="group relative w-full aspect-[2/3] rounded-[2rem] overflow-hidden cursor-pointer bg-neutral-900 shadow-2xl transition-transform duration-500 hover:-translate-y-2"
    >
        <img 
            src={movie.posterUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[2px] opacity-90"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Floating Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">HD</span>
                <span className="flex items-center gap-1 text-yellow-400 text-xs font-bold"><Star size={10} fill="currentColor"/> {movie.rating || 8.5}</span>
            </div>
            
            <h3 className="text-white font-bold text-lg leading-snug mb-1 drop-shadow-md">{movie.title}</h3>
            <p className="text-gray-400 text-xs font-medium line-clamp-1">{movie.genre || "Sci-Fi • Adventure"}</p>

            {/* Action Button */}
            <button className="mt-4 w-full py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-xs font-semibold hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2">
                <Play size={12} fill="currentColor" /> Watch Now
            </button>
        </div>
    </div>
  );

  // 3. Category Pills
  const categories = ["All", "Action", "Drama", "Romance", "Comedy", "Sci-Fi", "Horror"];

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500 selection:text-white">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-24 p-4 md:p-8 overflow-x-hidden">
        
        {/* Top Header: Search & Categories */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 sticky top-0 z-30 pt-2 pb-4 bg-[#050505]/80 backdrop-blur-lg">
            <div className="relative w-full md:max-w-md">
                <Search className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                <form onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        placeholder="Search movies, series..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-white/5 text-gray-200 pl-12 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-[#202020] transition-all placeholder:text-gray-600 font-medium"
                    />
                </form>
            </div>

            {/* Scrollable Filters */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => { setGenre(cat); cat === 'All' ? fetchMovies() : fetchByGenre(cat); }}
                        className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 border ${
                            genre === cat 
                            ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
                            : "bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </header>

        {/* Hero Section (Nếu không search) */}
        {!search && heroMovie && (
            <div className="relative w-full h-[450px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 group">
                <img 
                    src={heroMovie.posterUrl} 
                    alt="Hero" 
                    className="w-full h-full object-cover object-center transition-transform duration-[10s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                
                <div className="absolute bottom-12 left-8 md:left-16 max-w-2xl">
                    <span className="inline-block px-3 py-1 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-lg text-xs font-bold tracking-widest mb-4 backdrop-blur-md">
                        #1 TRENDING
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tight drop-shadow-2xl">
                        {heroMovie.title}
                    </h1>
                    <p className="text-gray-300 text-base md:text-lg mb-8 line-clamp-2 max-w-lg font-light leading-relaxed">
                        {heroMovie.description || "Hòa mình vào thế giới điện ảnh với chất lượng hình ảnh và âm thanh đỉnh cao. Bộ phim được mong chờ nhất năm."}
                    </p>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(`/movie/${heroMovie._id}`)} className="bg-white text-black px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-200 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            <Play fill="currentColor" size={20} /> Watch Movie
                        </button>
                        <button className="px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all">
                            <Info size={20} /> Details
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Movie Grid */}
        <section>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-purple-600 rounded-full block"></span>
                    {search ? `Results for "${search}"` : (genre === 'All' ? "New Releases" : `${genre} Movies`)}
                </h2>
                <div className="text-sm text-gray-500 font-medium cursor-pointer hover:text-white transition">View All</div>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="aspect-[2/3] bg-neutral-900/50 rounded-[2rem] animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
                    {movies.map((movie) => (
                        <ModernCard key={movie._id} movie={movie} />
                    ))}
                </div>
            )}

            {!loading && movies.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-600">
                    <Compass size={48} className="mb-4 opacity-50"/>
                    <p className="text-lg font-medium">No movies found here.</p>
                </div>
            )}
        </section>

      </main>
    </div>
  );
};

export default Movies;