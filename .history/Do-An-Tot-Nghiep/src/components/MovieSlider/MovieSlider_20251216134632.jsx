import React, { useEffect, useState } from "react";
import axios from "axios";
// import MovieCard from "../MovieCard/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MovieSlider = ({ title, endpoint }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies${endpoint}`)
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err));
  }, [endpoint]);

  return (
    <section className="px-6 md:px-10 py-8 bg-[#0a0a0a]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl md:text-2xl font-bold text-white">
          {title}
        </h2>

        <button
          onClick={() => navigate("/search")}
          className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full
                     bg-white/10 text-white border border-white/10
                     hover:bg-white hover:text-black transition"
        >
          <FaSearch size={12} /> Tìm kiếm
        </button>
      </div>

      {/* Slider */}
      <Swiper
        modules={[Autoplay]}
        slidesPerView={5}
        spaceBetween={20}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie._id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default MovieSlider;
