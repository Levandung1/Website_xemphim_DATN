import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Play } from "lucide-react";

const formatTime = (seconds = 0) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}m ${s}s`;
};

const WatchHistory = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/watch/history/${user._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, token, navigate]);

  if (loading) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen text-white">
        <Navbar />
        <div className="pt-32 text-center text-gray-400">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <h1 className="text-3xl font-black mb-8">
          🎬 Lịch sử xem phim
        </h1>

        {history.length === 0 ? (
          <p className="text-gray-400">
            Bạn chưa xem phim nào.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {history.map((item) => {
              const movie = item.movie;
              const percent =
                movie.duration
                  ? Math.min(
                      (item.lastWatchedTime /
                        (movie.duration * 60)) *
                        100,
                      100
                    )
                  : 0;

              return (
                <div
                  key={item._id}
                  onClick={() =>
                    navigate(`/movie/${movie._id}`, {
                      state: { lastWatchedTime: item.lastWatchedTime },
                    })
                  }
                  className="group relative bg-[#1a1a1a] rounded-xl overflow-hidden cursor-pointer
                             transition-all duration-300 hover:-translate-y-2
                             hover:shadow-[0_10px_40px_-10px_rgba(229,9,20,0.6)]"
                >
                  {/* Poster */}
                  <div className="aspect-[2/3] overflow-hidden">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-700
                                 group-hover:scale-110 group-hover:brightness-75"
                    />
                  </div>

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100
                               bg-gradient-to-t from-black via-black/50 to-transparent
                               transition-opacity flex items-end p-4"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/movie/${movie._id}`, {
                          state: {
                            lastWatchedTime: item.lastWatchedTime,
                            autoPlay: true,
                          },
                        });
                      }}
                      className="w-full py-2 bg-red-600 hover:bg-red-700
                                 rounded-lg text-xs font-bold flex items-center
                                 justify-center gap-2"
                    >
                      <Play size={14} fill="currentColor" />
                      Xem tiếp
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="font-bold text-sm line-clamp-2 mb-1">
                      {movie.title}
                    </h3>
                    <p className="text-xs text-gray-400 mb-2">
                      Đã xem {formatTime(item.lastWatchedTime)}
                    </p>

                    {/* Progress bar */}
                    <div className="w-full h-1 bg-gray-700 rounded">
                      <div
                        className="h-1 bg-red-600 rounded"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default WatchHistory;
