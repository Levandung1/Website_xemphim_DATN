import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, Flame, Play, Info, Filter, ChevronRight } from "lucide-react";

const API_URL = "http://localhost:5000/api/movies";

const Movies = () => {
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [heroMovie, setHeroMovie] = useState(null); // Phim hiển thị trên Banner
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("");
    const [loading, setLoading] = useState(false);

    // =============================
    // API FUNCTIONS
    // =============================
    const fetchMovies = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL);
            setMovies(res.data);
            if (res.data.length > 0) {
                // Chọn ngẫu nhiên 1 phim làm Banner
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

    const fetchSearch = async (e) => {
        if (e) e.preventDefault();
        if (!search.trim()) return fetchMovies();

        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/search`, {
                params: { query: search },
            });
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
    // COMPONENTS CON
    // =============================

    // 1. Navbar Hiệu ứng kính
    const Navbar = () => (
        <div className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-4 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm transition-all duration-300">
            <h1 className="text-3xl font-bold text-red-600 tracking-wider cursor-pointer" onClick={fetchMovies}>
                NETFLIX <span className="text-white text-sm font-normal">CLONE</span>
            </h1>

            <form onSubmit={fetchSearch} className="relative group hidden md:block">
                <input
                    className="bg-neutral-900/80 border border-neutral-700 text-white pl-10 pr-4 py-2 rounded-full w-64 focus:w-80 transition-all duration-300 focus:ring-2 focus:ring-red-600 outline-none placeholder-gray-500"
                    placeholder="Titles, people, genres..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            </form>
        </div>
    );

    // 2. Movie Card Hiện đại
    const MovieCard = ({ movie }) => (
        <div
            onClick={() => navigate(`/movie/${movie._id}`)}
            className="group relative cursor-pointer transition-all duration-300 hover:z-20 hover:scale-105"
        >
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg bg-neutral-800">
                <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />

                {/* Overlay tối khi hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 bg-gradient-to-t from-black via-transparent">
                    <div className="flex gap-2 mb-3">
                        <button className="bg-white text-black p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors">
                            <Play className="w-4 h-4 fill-current" />
                        </button>
                        <button className="border border-gray-400 text-white p-2 rounded-full hover:border-white transition-colors">
                            <Info className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-white font-bold text-lg leading-tight drop-shadow-md">{movie.title}</p>
                    <p className="text-gray-300 text-xs mt-1">{movie.genre || "Action"} • 2024</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-[#141414] min-h-screen text-white font-sans selection:bg-red-600 selection:text-white">
            <Navbar />

            {/* 🎬 HERO SECTION (Banner lớn) */}
            {heroMovie && !search && (
                <div className="relative h-[85vh] w-full">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src={heroMovie.posterUrl}
                            alt="Hero"
                            className="w-full h-full object-cover object-top"
                        />
                        {/* Gradient Overlay để làm mờ ảnh nền */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
                    </div>

                    {/* Content của Hero */}
                    <div className="absolute bottom-[20%] left-8 md:left-16 max-w-2xl z-10">
                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">FEATURED</span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg leading-tight">
                            {heroMovie.title}
                        </h1>
                        <p className="text-gray-300 text-lg mb-6 line-clamp-3 md:line-clamp-2 max-w-xl drop-shadow-md">
                            {heroMovie.description || "Hãy khám phá bộ phim tuyệt vời này ngay hôm nay. Trải nghiệm điện ảnh đỉnh cao chỉ có tại đây."}
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate(`/movie/${heroMovie._id}`)}
                                className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded hover:bg-opacity-80 transition font-bold text-lg"
                            >
                                <Play className="w-6 h-6 fill-black" /> Play
                            </button>
                            <button className="flex items-center gap-2 bg-gray-500/40 backdrop-blur-sm text-white px-6 py-3 rounded hover:bg-gray-500/60 transition font-semibold text-lg">
                                <Info className="w-6 h-6" /> More Info
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 🛠 FILTER BAR (Sticky dưới Hero) */}
            <div className="sticky top-[70px] z-40 bg-[#141414]/95 backdrop-blur px-8 py-4 flex flex-wrap items-center gap-4 border-b border-gray-800">
                <div className="flex items-center gap-2 text-gray-400">
                    <Filter className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wide">Filters:</span>
                </div>

                {["Action", "Drama", "Romance", "Comedy", "Sci-Fi", "Horror"].map((g) => (
                    <button
                        key={g}
                        onClick={() => { setGenre(g); fetchByGenre(g); }}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${genre === g
                                ? "bg-white text-black border-white"
                                : "bg-transparent text-gray-300 border-gray-600 hover:border-white"
                            }`}
                    >
                        {g}
                    </button>
                ))}

                <button
                    onClick={() => { setGenre(""); fetchTrending(); }}
                    className="ml-auto flex items-center gap-2 text-red-500 hover:text-red-400 font-bold transition-colors"
                >
                    <Flame className="w-5 h-5 fill-current" /> Trending Now
                </button>
            </div>

            {/* 🎞 MAIN CONTENT */}
            <div className="px-8 py-10">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    {search ? `Search Results for: "${search}"` : (genre ? `${genre} Movies` : "New Releases")}
                    <ChevronRight className="w-5 h-5 text-red-600" />
                </h2>

                {loading ? (
                    // Loading Skeleton
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-neutral-800 rounded-lg h-80"></div>
                        ))}
                    </div>
                ) : (
                    // Movie Grid
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10">
                        {movies.map((m) => (
                            <MovieCard key={m._id} movie={m} />
                        ))}
                    </div>
                )}

                {movies.length === 0 && !loading && (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl">Không tìm thấy phim nào phù hợp.</p>
                    </div>
                )}
            </div>

            <div className="h-20 text-center text-gray-600 text-sm">
                Designed for Movie Lovers © 2024
            </div>
        </div>
    );
};

export default Movies;