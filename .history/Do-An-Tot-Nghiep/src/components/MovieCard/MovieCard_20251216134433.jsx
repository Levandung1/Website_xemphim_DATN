import React from "react";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie._id}`)}
      className="group relative rounded-xl overflow-hidden cursor-pointer
                 bg-[#1a1a1a] transition-all duration-500
                 hover:-translate-y-2
                 hover:shadow-[0_10px_40px_-10px_rgba(147,51,234,0.6)]"
    >
      {/* Poster */}
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover
                     transition-transform duration-700
                     group-hover:scale-110 group-hover:brightness-75"
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100
                   transition-opacity duration-300
                   bg-gradient-to-t from-black via-black/40 to-transparent
                   flex items-end p-4"
      >
        <div className="w-full">
          <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">
            {movie.title}
          </h3>

          <button
            className="w-full py-2 text-xs font-bold rounded-lg
                       bg-purple-600 hover:bg-purple-700
                       flex items-center justify-center gap-2"
          >
            <Play size={12} fill="currentColor" /> Xem ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
