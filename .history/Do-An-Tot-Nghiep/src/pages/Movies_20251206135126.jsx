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
                params: { query: search }
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
    const MovieCard = ({ movie }) => (
        <div
            onClick={() => navigate(`/movie/${movie._id}`)}
            className="cursor-pointer shadow rounded bg-white overflow-hidden hover:scale-105 transition"
        >
            <img
                src={movie.posterUrl}
                className="w-full h-60 object-cover"
                alt={movie.title}
            />

            <div className="p-3">
                <h3 className="font-bold text-lg">{movie.title}</h3>
                <p className="opacity-70 text-sm">{movie.genre}</p>
                <p className="mt-1 text-sm">⭐ {movie.rating}/10</p>
            </div>
        </div>
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">

            <h1 className="text-3xl font-bold mb-5">🎬 Movies</h1>

            {/* Search */}
            <div className="flex gap-3 mb-5">
                <input
                    className="border p-2 rounded w-full"
                    placeholder="Search movies..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    onClick={fetchSearch}
                    className="bg-blue-600 text-white px-4 rounded"
                >
                    Search
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-5">
                <select
                    value={genre}
                    onChange={(e) => {
                        setGenre(e.target.value);
                        if (e.target.value === "") return fetchMovies();
                        fetchByGenre(e.target.value);
                    }}
                    className="border p-2 rounded"
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
                    className="bg-red-500 text-white px-4 rounded"
                >
                    🔥 Trending
                </button>
            </div>

            {/* Loading */}
            {loading && (
                <p className="text-center text-lg font-semibold">Loading...</p>
            )}

            {/* Movie grid */}
            {!loading && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {movies.map((m) => (
                        <MovieCard key={m._id} movie={m} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Movies;
