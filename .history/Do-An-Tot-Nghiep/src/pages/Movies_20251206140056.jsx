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

  // =============================
  // API
  // =============================

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

  // Load lần đầu
  useEffect(() => {
    fetchMovies();
  }, []);

  // =============================
  // Netflix Card chuẩn 1:1.5
  // =============================
  const MovieCard = ({ movie }) => (
    <div
      onClick={() => navigate(`/movie/${movie._id}`)}
      className="cursor-pointer transform hover:scale-110 transition-all duration-300 mr-4"
      style={{ minWidth: "180px" }} // Netflix poster width
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-64 rounded-md object-cover shadow-lg"
      />
      <p className="text-sm mt-2 font-semibold text-white truncate">
        {movie.title}
      </p>
    </div>
  );

  return (
    <div className="bg-black min-h-screen text-white px-6 py-6 overflow-x-hidden">

      {/* 🎬 Header */}
      <h1 className="text-4xl font-extrabold mb-6 flex items-center gap-2">
        🎬 Movie Library
      </h1>

      {/* 🔍 Search */}
      <div className="flex gap-3 mb-6">
        <input
          className="bg-neutral-800 border border-neutral-700 text-white p-3 rounded-lg w-full placeholder-neutral-400 focus:ring-2 focus:ring-red-600 outline-none"
          placeholder="🔍 Tìm phim theo tên, diễn viên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={fetchSearch}
          className="px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 active:scale-95"
        >
          Search
        </button>
      </div>

      {/* 🔥 Filters */}
      <div className="flex gap-3 mb-8">
        <select
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            if (e.target.value === "") return fetchMovies();
            fetchByGenre(e.target.value);
          }}
          className="bg-neutral-800 border border-neutral-700 text-white p-3 rounded-lg"
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
          className="px-5 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95"
        >
          🔥 Trending
        </button>
      </div>

      {/* LOADING */}
      {loading && <p className="text-center text-lg opacity-70">Loading...</p>}

      {/* =============================
            🎞 DANH SÁCH PHIM - NETFLIX STYLE
         ============================= */}
      {!loading && (
        <>
          <h2 className="text-2xl font-bold mb-4">Danh sách phim</h2>

          {/* NETFLIX ROW SCROLL */}
          <div className="flex overflow-x-auto pb-4 no-scrollbar">
            {movies.map((m) => (
              <MovieCard key={m._id} movie={m} />
            ))}
          </div>
        </>
      )}

      <div className="h-16"></div>
    </div>
  );
};

export default Movies;
