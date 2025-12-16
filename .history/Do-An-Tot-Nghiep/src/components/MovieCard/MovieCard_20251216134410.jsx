import React from "react";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`/movie/${movie._id}`);
  };

  return (
    <div
      className="relative group rounded-xl bg-[#141414]
                 overflow-visible transition-transform duration-300
                 hover:scale-[1.15] hover:z-30"
    >
      {/* ================= POSTER ================= */}
      <div
        onClick={goDetail}
        className="relative aspect-[2/3] overflow-hidden rounded-xl cursor-pointer"
      >
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover
                     transition duration-500
                     group-hover:brightness-75"
        />
      </div>

      {/* ================= HOVER PREVIEW ================= */}
      <div
        className="absolute left-0 right-0 -bottom-28
                   opacity-0 scale-95
                   group-hover:opacity-100 group-hover:scale-100
                   transition-all duration-300
                   bg-[#1b1b1b] rounded-xl p-3
                   shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      >
        {/* TITLE */}
        <h3 className="text-sm font-bold text-white line-clamp-2 mb-2">
          {movie.title}
        </h3>

        {/* META */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span>⭐ {movie.rating || "N/A"}</span>
          <span>👁 {movie.views || 0}</span>
          {movie.year && <span>{movie.year}</span>}
        </div>

        {/* GENRE */}
        {movie.genre && (
          <p className="text-xs text-gray-400 line-clamp-1 mb-3">
            {movie.genre}
          </p>
        )}

        {/* ACTIONS */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              goDetail();
            }}
            className="flex-1 py-2 bg-red-600 hover:bg-red-700
                       rounded-lg text-xs font-bold text-white
                       flex items-center justify-center gap-2"
          >
            <Play size={14} fill="currentColor" />
            Xem ngay
          </button>

          <button
            onClick={(e) => e.stopPropagation()}
            className="w-9 h-9 rounded-full
                       border border-white/20
                       flex items-center justify-center
                       text-white hover:bg-white/10"
            title="Thêm vào danh sách"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
