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
    Star,
    Film
} from "lucide-react";

// =============================
// CONFIG & STYLES
// =============================
const API_URL = "http://localhost:5000/api/movies";

// Custom Scrollbar Hide & Animation Class (Thêm vào file CSS toàn cục nếu cần, hoặc dùng style inline như dưới)
const scrollbarHideStyle = {
    msOverflowStyle: 'none',  /* IE and Edge */
    scrollbarWidth: 'none'  /* Firefox */
};

const Movies = () => {
    const navigate = useNavigate();

    // State
    const [movies, setMovies] = useState([]);
    const [heroMovie, setHeroMovie] = useState(null);
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("All");
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // =============================
    // API LOGIC
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
            console.error("API Error:", err);
            // Fake data for demo if API fails
            // setMovies([...Array(10)].map((_,i) => ({_id: i, title: `Movie ${i}`, posterUrl: `https://source.unsplash.com/random/300x450?movie&sig=${i}`, rating: 8.5})));
        } finally {
            setLoading(false);
        }
    };

    const fetchTrending = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/trending`);
            setMovies(res.data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const fetchByGenre = async (genreName) => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/genre/${genreName}`);
            setMovies(res.data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search.trim()) { fetchMovies(); return; }
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/search`, { params: { query: search } });
            setMovies(res.data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    // =============================
    // COMPONENTS
    // =============================

    const SidebarItem = ({ icon, label, active, onClick }) => (
        <button
            onClick={onClick}
            className={`relative group flex items-center justify-center xl:justify-start gap-4 p-3 w-full rounded-xl transition-all duration-300
      ${active
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
        >
            <div className={`${active ? "scale-110" : "scale-100"} transition-transform duration-300`}>
                {icon}
            </div>
            {/* Label chỉ hiện ở màn hình lớn (XL) */}
            <span className="hidden xl:block font-medium text-sm tracking-wide">{label}</span>

            {/* Tooltip cho màn hình nhỏ */}
            <div className="absolute left-14 xl:hidden bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                {label}
            </div>
        </button>
    );

    const MovieCard = ({ movie }) => (
        <div
            onClick={() => navigate(`/movie/${movie._id}`)}
            className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(147,51,234,0.5)]"
        >
            {/* Image Container */}
            <div className="aspect-[2/3] w-full overflow-hidden">
                <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-75"
                />
            </div>
            <div className="bg-red-500 text-white p-10">
                TAILWIND OK?
            </div>
            {/* Hover Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-2">
                        <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">HD</span>
                        <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold">
                            <Star size={12} fill="currentColor" /> {movie.rating || "N/A"}
                        </div>
                    </div>
                    <h3 className="text-white font-bold text-lg leading-tight mb-1 drop-shadow-md">{movie.title}</h3>
                    <p className="text-gray-300 text-xs line-clamp-1 mb-3">{movie.genre || "Action • Sci-Fi"}</p>

                    <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                        <Play size={12} fill="currentColor" /> Watch Now
                    </button>
                </div>
            </div>
        </div>
    );

    const CategoryPill = ({ name }) => (
        <button
            onClick={() => { setGenre(name); name === 'All' ? fetchMovies() : fetchByGenre(name); }}
            className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border
      ${genre === name
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white"
                }`}
        >
            {name}
        </button>
    );

    // =============================
    // MAIN LAYOUT
    // =============================
    return (
        // ROOT CONTAINER: Flex Row để đảm bảo Sidebar và Content nằm ngang
        <div className="flex h-screen w-full bg-[#0a0a0a] text-white font-sans overflow-hidden">

            {/* 1. SIDEBAR (Desktop) - Luôn hiển thị ở bên trái */}
            <aside className="hidden md:flex flex-col items-center xl:items-start w-20 xl:w-64 h-full bg-[#050505] border-r border-white/5 py-8 px-4 z-50 flex-shrink-0">
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/50">
                        <Film className="text-white fill-white w-5 h-5" />
                    </div>
                    <span className="hidden xl:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        CineMax
                    </span>
                </div>

                <nav className="flex flex-col w-full gap-4">
                    <SidebarItem icon={<Home size={20} />} label="Home" active={genre === 'All' && !search} onClick={() => { setGenre("All"); setSearch(""); fetchMovies(); }} />
                    <SidebarItem icon={<TrendingUp size={20} />} label="Trending" onClick={fetchTrending} />
                    <SidebarItem icon={<Compass size={20} />} label="Explore" />
                    <SidebarItem icon={<Heart size={20} />} label="Favorites" />
                </nav>

                <div className="mt-auto w-full px-2">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition">
                        <img src="https://i.pravatar.cc/100" alt="User" className="w-8 h-8 rounded-full border border-purple-500" />
                        <div className="hidden xl:flex flex-col">
                            <span className="text-sm font-bold text-gray-200">Đình Pháp</span>
                            <span className="text-[10px] text-gray-500">Premium Member</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/80 z-50 md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}>
                    <div className="w-64 h-full bg-[#111] p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-xl font-bold">Menu</span>
                            <button onClick={() => setIsSidebarOpen(false)}><X /></button>
                        </div>
                        <nav className="flex flex-col gap-6">
                            <div onClick={() => { setGenre("All"); fetchMovies(); setIsSidebarOpen(false) }} className="text-lg font-medium text-gray-300">Home</div>
                            <div onClick={() => { fetchTrending(); setIsSidebarOpen(false) }} className="text-lg font-medium text-gray-300">Trending</div>
                        </nav>
                    </div>
                </div>
            )}

            {/* 2. MAIN CONTENT AREA - Flex-1 để chiếm phần còn lại */}
            <main className="flex-1 h-full overflow-y-auto relative scroll-smooth" style={scrollbarHideStyle}>

                {/* Header (Sticky inside Main) */}
                <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between gap-4">
                    <div className="md:hidden">
                        <button onClick={() => setIsSidebarOpen(true)}><Menu /></button>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="relative w-full max-w-lg group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search for movies..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#161616] border border-white/10 text-sm text-white pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-transparent transition-all placeholder:text-gray-600"
                        />
                    </form>

                    {/* Top Right Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <button className="w-10 h-10 rounded-full bg-[#161616] flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition">
                            <Info size={18} />
                        </button>
                    </div>
                </header>

                <div className="p-6 md:p-10 pb-20">

                    {/* Category Filter Scroll */}
                    <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                        {["All", "Action", "Drama", "Romance", "Comedy", "Sci-Fi", "Horror", "Adventure"].map(cat => (
                            <CategoryPill key={cat} name={cat} />
                        ))}
                    </div>

                    {/* HERO SECTION */}
                    {!search && heroMovie && (
                        <div className="relative w-full h-[50vh] min-h-[400px] rounded-[2rem] overflow-hidden shadow-2xl mb-12 group">
                            <img
                                src={heroMovie.posterUrl}
                                alt="Hero"
                                className="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110"
                            />
                            {/* Cinematic Gradient Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-400 text-xs font-bold tracking-wider mb-4 backdrop-blur-sm">
                                    <TrendingUp size={12} /> #1 TRENDING
                                </span>
                                <h1 className="text-4xl md:text-6xl font-black mb-4 leading-none tracking-tight drop-shadow-xl">
                                    {heroMovie.title}
                                </h1>
                                <p className="text-gray-300 text-sm md:text-base line-clamp-2 mb-6 max-w-xl leading-relaxed opacity-90">
                                    {heroMovie.description || "Experience the ultimate cinematic journey. High definition quality and immersive sound."}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <button onClick={() => navigate(`/movie/${heroMovie._id}`)} className="bg-white text-black px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors">
                                        <Play fill="currentColor" size={16} /> Watch Now
                                    </button>
                                    <button className="bg-white/10 backdrop-blur-md text-white border border-white/10 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors">
                                        More Info
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* MOVIES GRID */}
                    <div className="mb-6 flex items-end justify-between">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            {search ? `Results for "${search}"` : "New Releases"}
                        </h2>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="aspect-[2/3] bg-[#1a1a1a] rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {movies.length > 0 ? (
                                movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
                            ) : (
                                <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
                                    <Film size={48} className="mb-4 opacity-20" />
                                    <p>No movies found.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Movies;