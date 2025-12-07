import React from "react";

const MovieRow = ({ title, data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="mt-10 px-8">
      <h2 className="text-xl font-semibold text-white mb-4">{title} &gt;</h2>

      <div className="overflow-x-auto scrollbar-hide scroll-smooth">
        <div className="flex flex-nowrap gap-4 pb-6">
          {data.map((movie) => (
            <div
              key={movie._id}
              className="w-[180px] md:w-[230px] flex-shrink-0 cursor-pointer group transition-transform duration-300 hover:scale-110"
            >
              <div className="w-full h-[260px] md:h-[320px] rounded-lg overflow-hidden shadow-lg relative">
                <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
              </div>

              <p className="mt-2 text-sm text-gray-300 text-center truncate">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default MovieRow;
