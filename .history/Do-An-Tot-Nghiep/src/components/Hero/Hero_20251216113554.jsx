import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">

      {/* Background */}
      <img
        src="/images/banner.jpg"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-end px-10 pb-24 max-w-4xl">
        <div>
          <span className="text-purple-400 text-xs font-bold mb-3 inline-block">
            #1 TRENDING
          </span>

          <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
            Phát đạn của kẻ điên
          </h1>

          <p className="text-gray-300 max-w-xl mb-6 line-clamp-3">
            Một bộ phim hành động – tâm lý kịch tính, xoay quanh kẻ sát nhân bí ẩn
            gieo rắc nỗi kinh hoàng bằng những phát đạn lạnh lùng.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/movies")}
              className="bg-white text-black px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-200 transition"
            >
              ▶ Xem ngay
            </button>
            <button className="bg-white/10 border border-white/10 px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition">
              Chi tiết
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
