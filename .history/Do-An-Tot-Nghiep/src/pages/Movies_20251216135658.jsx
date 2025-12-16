import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import MovieCard from "../components/MovieCard";
import { Play } from "lucide-react";

const API_URL = "http://localhost:5000/api/movies";

const Movies = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setMovies(res.data);
      if (res.data.length > 0) {
        setHeroMovie(
          res.data[Math.floor(Math.random() * res.data.length)]
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return fetchMovies();
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/search`, {
        params: { query: search },
      });
      setMovies(res.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen pt-16">
      <Navbar />

      {/* HERO */}
      {heroMovie && (
        <section className="relative h-[75vh] min-h-[500px]">
          <img
            src={heroMovie.backdropUrl || heroMovie.posterUrl}
            alt={heroMovie.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto h-full flex items-end px-6 pb-20">
            <div>
              <span className="text-red-500 font-bold"># TRENDING</span>
              <h1 className="text-4xl md:text-6xl font-black mb-4">
                {heroMovie.title}
              </h1>
              <p className="max-w-xl text-gray-300 mb-6 line-clamp-3">
                {heroMovie.description}
              </p>
              <button
                onClick={() => navigate(`/movie/${heroMovie._id}`)}
                className="bg-white text-black px-8 py-3 rounded-xl font-bold flex gap-2"
              >
                <Play fill="currentColor" /> Xem ngay
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SEARCH */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <form onSubmit={handleSearch}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm phim..."
            className="w-full max-w-md bg-[#161616] border border-white/10 rounded-full px-5 py-3"
          />
        </form>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] bg-[#1a1a1a] rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 overflow-visible">
            {movies.map((m) => (
              <MovieCard key={m._id} movie={m} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Movies;
