import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/movies";

const Movies = () => {
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("");
    const [loading, setLoading] = useState(false);

    /* =============================
        📌 API CALLS
       ============================= */

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL);
            setMovies(res.data);
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

    const fetchSearch = async () => {
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

    /* =============================
        📌 Load danh sách phim
       ============================= */

    useEffect(() => {
        fetchMovies();
    }, []);

    /* =============================
        🎞 Movie Card Component
       ============================= */

    const MovieCard = ({ movie }) => (
        <div
            onClick={() => navigate(`/movie/${movie._id}`)}
            className="cursor-pointer rounded-xl bg-white shadow-lg overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
            <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-64 object-cover"
            />

            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">{movie.title}</h3>
                <p className="text-sm text-gray-500">{movie.genre}</p>

                <div className="mt-2 flex items-center gap-2">
                    <span className="text-yellow-500 text-lg">⭐</span>
                    <span className="font-semibold">{movie.rating}/10</span>
                </div>
            </div>
        </div>
    );

    /* =============================
        🎬 UI
       ============================= */

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-6 text-gray-900 tracking-tight">
                🎬 Movie Library
            </h1>

            {/* Search */}
            <div className="flex gap-3 mb-6">
                <input
                    className="border w-full p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="🔍 Tìm phim theo tên, diễn viên..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button
                    onClick={fetchSearch}
                    className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 active:scale-95"
                >
                    Search
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-6">
                <select
                    value={genre}
                    onChange={(e) => {
                        setGenre(e.target.value);
                        if (e.target.value === "") return fetchMovies();
                        fetchByGenre(e.target.value);
                    }}
                    className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Genres</option>
                    <option value="Action">Action</option>
                    <option value="Drama">Drama</option>
                    <option value="Romance">Romance</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Horror">Horror</option>
                </select>

                <button
                    onClick={fetchTrending}
                    className="px-5 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 active:scale-95"
                >
                    🔥 Trending
                </button>
            </div>

            {/* Loading */}
            {loading && (
                <p className="text-center text-xl font-semibold text-gray-700">
                    ⏳ Loading...
                </p>
            )}

            {/* Movie grid */}
            {!loading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
                    {movies.map((m) => (
                        <MovieCard key={m._id} movie={m} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Movies;
