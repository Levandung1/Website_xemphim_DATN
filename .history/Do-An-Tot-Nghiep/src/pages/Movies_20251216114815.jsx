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
    Film,
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

    /* ================= FETCH ================= */

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL);
            setMovies(res.data);
            if (res.data.length > 0) {
                setHeroMovie(res.data[Math.floor(Math.random() * res.data.length)]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchTrending = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/trending`);
            setMovies(res.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const fetchByGenre = async (g) => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/genre/${g}`);
            setMovies(res.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search.trim()) return fetchMovies();
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/search`, {
                params: { query: search },
            });
            setMovies(res.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    /* ================= UI PARTS ================= */

    const SidebarItem = ({ icon, label, onClick }) => (
        <button
            onClick={onClick}
            className="flex items-center gap-4 px-3 py-3 rounded-xl text-gray-400
                 hover:bg-white/5 hover:text-white transition"
        >
            {icon}
            <span className="hidden xl:block text-sm font-medium">{label}</span>
        </button>
    );

    const MovieCard = ({ movie }) => (
        <div
            onClick={() => navigate(`/movie/${movie._id}`)}
            className="group relative rounded-xl overflow-hidden cursor-pointer
                 bg-[#1a1a1a] transition-all duration-500
                 hover:-translate-y-2
                 hover:shadow-[0_10px_40px_-10px_rgba(147,51,234,0.6)]"
        >
            <div className="aspect-[2/3] overflow-hidden">
                <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover
                     transition-transform duration-700
                     group-hover:scale-110 group-hover:brightness-75"
                />
            </div>

            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100
                   bg-gradient-to-t from-black via-black/40 to-transparent
                   transition-opacity flex items-end p-4"
            >
                <div className="w-full">
                    <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">
                        {movie.title}
                    </h3>
                    <button className="w-full py-2 bg-purple-600 hover:bg-purple-700
                             rounded-lg text-xs font-bold flex items-center
                             justify-center gap-2">
                        <Play size={12} fill="currentColor" /> Watch
                    </button>
                </div>
            </div>
        </div>
    );

    const CategoryPill = ({ name }) => (
        <button
            onClick={() => {
                setGenre(name);
                name === "All" ? fetchMovies() : fetchByGenre(name);
            }}
            className={`px-5 py-2 rounded-full text-xs font-bold border transition
        ${genre === name
                    ? "bg-white text-black border-white"
                    : "text-gray-400 border-gray-700 hover:text-white hover:border-gray-500"
                }`}
        >
            {name}
        </button>
    );

    /* ================= RENDER ================= */

    return (
        <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
            {/* ================= SIDEBAR ================= */}
            <aside className="hidden md:flex flex-col w-20 xl:w-64 bg-[#050505]
                        border-r border-white/5 py-8 px-4">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                        <Film />
                    </div>
                    <span className="hidden xl:block font-bold text-lg">CineMax</span>
                </div>

                <nav className="flex flex-col gap-3">
                    <SidebarItem icon={<Home />} label="Home" onClick={fetchMovies} />
                    <SidebarItem icon={<TrendingUp />} label="Trending" onClick={fetchTrending} />
                    <SidebarItem icon={<Compass />} label="Explore" />
                    <SidebarItem icon={<Heart />} label="Favorites" />
                </nav>
            </aside>

            {/* ================= MAIN ================= */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <header className="sticky top-0 z-40 h-16 flex items-center
                           bg-[#0a0a0a]/80 backdrop-blur border-b border-white/5
                           px-6 md:px-10">
                    <form onSubmit={handleSearch} className="relative w-full max-w-lg">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search movies..."
                            className="w-full bg-[#161616] rounded-full py-2.5 pl-10 pr-4
                         text-sm text-white border border-white/10"
                        />
                    </form>
                </header>

                {/* Content */}
                <div className="px-6 md:px-10 pb-20 max-w-7xl mx-auto">
                    {/* Categories */}
                    <div className="flex gap-3 overflow-x-auto py-6">
                        {["All", "Action", "Drama", "Comedy", "Sci-Fi", "Horror"].map((c) => (
                            <CategoryPill key={c} name={c} />
                        ))}
                    </div>

                    {/* Hero */}
                    {!search && heroMovie && (
                        <div className="relative h-[50vh] min-h-[380px] rounded-2xl overflow-hidden mb-12">
                            <img
                                src={heroMovie.posterUrl}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            <div className="absolute bottom-0 p-8 max-w-xl">
                                <h1 className="text-4xl font-black mb-4">{heroMovie.title}</h1>
                                <button
                                    onClick={() => navigate(`/movie/${heroMovie._id}`)}
                                    className="bg-white text-black px-6 py-3 rounded-xl font-bold flex gap-2"
                                >
                                    <Play size={16} fill="currentColor" /> Watch Now
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Grid */}
                    {loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="aspect-[2/3] bg-[#1a1a1a] rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                            {movies.map((m) => (
                                <MovieCard key={m._id} movie={m} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Movies;
