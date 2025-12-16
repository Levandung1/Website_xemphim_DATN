import React from "react";
import { useNavigate } from "react-router-dom";
import { Play, Plus } from "lucide-react";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`/movie/${movie._id}`);
  };

  return (
    <div className="relative group">
      {/* POSTER */}
      <div
        onClick={goDetail}
        className="
          cursor-pointer
          aspect-[2/3]
          rounded-xl overflow-hidden
          bg-[#1a1a1a]
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

      {/* HOVER PREVIEW */}
      <div
        className="
          absolute left-0 right-0 top-full mt-2
          opacity-0 translate-y-2
          group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-300
          z-20
          pointer-events-none group-hover:pointer-events-auto
        "
      >
        <div
          className="
            bg-[#141414]
            rounded-xl p-4
            border border-white/10
            shadow-[0_20px_50px_rgba(0,0,0,0.8)]
          "
        >
          <h3 className="text-sm font-bold line-clamp-2 mb-2">
            {movie.title}
          </h3>

          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
            <span>⭐ {movie.rating || "N/A"}</span>
            <span>👁 {movie.views || 0}</span>
            {movie.year && <span>{movie.year}</span>}
          </div>

          <div className="flex gap-2">
            <button
              onClick={goDetail}
              className="
                flex-1 py-2
                bg-red-600 hover:bg-red-700
                rounded-lg text-xs font-bold
                flex items-center justify-center gap-2
              "
            >
              <Play size={14} fill="currentColor" />
              Xem ngay
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                alert("Đã thêm (demo)");
              }}
              className="
                w-9 h-9 rounded-full
                border border-white/20
                flex items-center justify-center
                hover:bg-white/10
              "
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
