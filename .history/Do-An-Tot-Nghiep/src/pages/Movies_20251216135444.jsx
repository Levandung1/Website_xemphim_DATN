import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Play, Star } from "lucide-react";

const API_URL = "http://localhost:5000/api/movies";

const Movies = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

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

  const fetchByGenre = async (g) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/genre/${g}`);
      setMovies(res.data);
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= COMPONENTS ================= */

  const CategoryPill = ({ name }) => (
    <button
      onClick={() => {
        setGenre(name);
        name === "All" ? fetchMovies() : fetchByGenre(name);
      }}
      className={`px-5 py-2 rounded-full text-sm font-bold transition
        ${genre === name
          ? "bg-white text-black"
          : "bg-transparent text-gray-400 border border-gray-600 hover:text-white"
        }`}
    >
      {name}
    </button>
  );

  const MovieCard = ({ movie }) => (
    <div
      onClick={() => navigate(`/movie/${movie._id}`)}
      className="group cursor-pointer rounded-xl overflow-hidden bg-[#1a1a1a]
                 transition-all duration-500 hover:-translate-y-2
                 hover:shadow-[0_10px_40px_-10px_rgba(229,9,20,0.6)]"
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700
                     group-hover:scale-110 group-hover:brightness-75"
        />
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                      bg-gradient-to-t from-black via-black/40 to-transparent
                      transition-opacity flex items-end p-4">
        <div className="w-full">
          <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">
            {movie.title}
          </h3>
          <button className="w-full py-2 bg-red-600 hover:bg-red-700
                             rounded-lg text-xs font-bold flex items-center
                             justify-center gap-2">
            <Play size={12} fill="currentColor" /> Xem phim
          </button>
        </div>
      </div>
    </div>
  );

  /* ================= RENDER ================= */

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen pt-16">
      <Navbar />

      {/* ================= HERO ================= */}
      {heroMovie && (
        <section className="relative h-[75vh] min-h-[500px] w-full overflow-hidden">
          <img
            src={heroMovie.backdropUrl || heroMovie.posterUrl}
            alt={heroMovie.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto h-full flex items-end px-6 pb-20">
            <div>
              <span className="text-red-500 text-sm font-bold mb-2 block">
                # TRENDING
              </span>
              <h1 className="text-4xl md:text-6xl font-black mb-4">
                {heroMovie.title}
              </h1>
              <p className="text-gray-300 max-w-xl mb-6 line-clamp-3">
                {heroMovie.description}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate(`/movie/${heroMovie._id}`)}
                  className="bg-white text-black px-8 py-3 rounded-xl font-bold flex gap-2"
                >
                  <Play fill="currentColor" /> Xem ngay
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= FILTER ================= */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <form onSubmit={handleSearch} className="mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm phim..."
            className="w-full max-w-md bg-[#161616] border border-white/10
                       rounded-full px-5 py-3 text-sm"
          />
        </form>
      </section>

      {/* ================= GRID ================= */}
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
