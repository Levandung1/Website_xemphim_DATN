import React from "react";
import { useNavigate } from "react-router-dom";
import { Play, Plus } from "lucide-react";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`/movie/${movie._id}`);
  };

  return (
    <div
      className="
        relative group
        transition-all duration-300
        hover:z-30
      "
    >
      {/* ================= POSTER ================= */}
      <div
        onClick={goDetail}
        className="
          relative cursor-pointer
          aspect-[2/3]
          rounded-xl overflow-hidden
          bg-[#1a1a1a]
          transition-transform duration-300
          group-hover:scale-105
        "
      >
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="
            w-full h-full object-cover
            transition duration-500
            group-hover:brightness-75
          "
        />
      </div>

      {/* ================= HOVER PREVIEW ================= */}
      <div
        className="
          absolute left-0 right-0
          -bottom-[150px]
          opacity-0 scale-95
          group-hover:opacity-100 group-hover:scale-100
          transition-all duration-300
          pointer-events-none group-hover:pointer-events-auto
        "
      >
        <div
          className="
            bg-[#141414]
            rounded-xl p-4
            shadow-[0_20px_50px_rgba(0,0,0,0.8)]
            border border-white/10
          "
        >
          {/* TITLE */}
          <h3 className="text-sm font-bold text-white line-clamp-2 mb-2">
            {movie.title}
          </h3>

          {/* META */}
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
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
            {/* PLAY */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goDetail();
              }}
              className="
                flex-1 py-2
                bg-red-600 hover:bg-red-700
                rounded-lg
                text-xs font-bold text-white
                flex items-center justify-center gap-2
              "
            >
              <Play size={14} fill="currentColor" />
              Xem ngay
            </button>

            {/* ADD */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                alert("Đã thêm vào danh sách (demo)");
              }}
              className="
                w-9 h-9
                rounded-full
                border border-white/20
                flex items-center justify-center
                text-white
                hover:bg-white/10
              "
              title="Thêm vào danh sách"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
