import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { FaPlay, FaStar, FaHeart } from "react-icons/fa";
import { X } from "lucide-react";

const MovieDetail = () => {
  const { id } = useParams();
  const location = useLocation();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = useRef(null);

  /* ================= FETCH ================= */

  useEffect(() => {
    const u = localStorage.getItem("user");
    const t = localStorage.getItem("token");
    if (u && t) {
      setUser(JSON.parse(u));
      setToken(t);
    }

    fetchMovie();
    fetchComments();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/movies/${id}`);
      setMovie(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/comments/movie/${id}`
      );
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= COMMENT ================= */

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!user) return alert("Vui lòng đăng nhập");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/comments",
        { movieId: id, content: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([res.data, ...comments]);
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= VIDEO ================= */

  const handleCloseVideo = async () => {
    if (user && currentTime > 0) {
      try {
        await axios.post(
          "http://localhost:5000/api/watch/history",
          {
            userId: user._id,
            movieId: id,
            lastWatchedTime: currentTime,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error(err);
      }
    }
    setShowVideo(false);
  };

  if (loading) return <div className="text-white p-10">Loading...</div>;
  if (!movie) return <div className="text-white p-10">Movie not found</div>;

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <img
          src={movie.backdropUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

        <div className="relative z-10 h-full flex items-end px-10 pb-20">
          <div className="flex gap-10 items-end max-w-6xl">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-[260px] rounded-xl shadow-2xl hidden md:block"
            />

            <div>
              <h1 className="text-4xl md:text-6xl font-black mb-4">
                {movie.title}
              </h1>

              <div className="flex gap-6 text-gray-300 mb-4 text-sm">
                <span>{movie.year}</span>
                <span>{movie.duration}</span>
                <span className="flex items-center gap-1 text-yellow-400">
                  <FaStar /> {movie.rating}
                </span>
              </div>

              <p className="text-gray-300 max-w-2xl mb-6 leading-relaxed">
                {movie.description}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowVideo(true)}
                  className="bg-white text-black px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-200"
                >
                  <FaPlay /> Xem phim
                </button>

                <button className="bg-white/10 border border-white/10 px-6 py-3 rounded-xl font-bold hover:bg-white/20">
                  <FaHeart /> Yêu thích
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VIDEO MODAL ================= */}
      {showVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative w-[90%] max-w-6xl">
            <button
              onClick={handleCloseVideo}
              className="absolute -top-12 right-0 text-white hover:text-red-500"
            >
              <X size={32} />
            </button>

            <video
              ref={videoRef}
              src={movie.trailerUrl}
              controls
              autoPlay
              onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
              className="w-full rounded-xl max-h-[80vh]"
            />
          </div>
        </div>
      )}

      {/* ================= INFO ================= */}
      <section className="px-10 py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Thông tin phim</h2>
        <div className="grid md:grid-cols-2 gap-4 text-gray-300">
          <p>🎬 Đạo diễn: {movie.director}</p>
          <p>🎭 Diễn viên: {movie.actors?.join(", ")}</p>
          <p>📁 Thể loại: {movie.genre}</p>
          <p>🌍 Quốc gia: {movie.country}</p>
        </div>
      </section>

      {/* ================= COMMENTS ================= */}
      <section className="px-10 pb-20 max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-6">Bình luận</h2>

        <form onSubmit={handleCommentSubmit} className="mb-6 flex gap-4">
          <input
            type="text"
            disabled={!user}
            placeholder={
              user ? "Viết bình luận..." : "Vui lòng đăng nhập để bình luận"
            }
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-white"
          />
          <button
            disabled={!user}
            className="bg-purple-600 hover:bg-purple-700 px-6 rounded-lg font-bold disabled:opacity-40"
          >
            Gửi
          </button>
        </form>

        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c._id}
              className="bg-[#161616] border border-white/10 rounded-lg p-4"
            >
              <div className="flex justify-between text-sm mb-2">
                <span className="text-purple-400 font-bold">
                  {c.userName}
                </span>
                <span className="text-gray-500">
                  {new Date(c.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <p className="text-gray-300">{c.content}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MovieDetail;
