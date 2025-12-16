import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import MovieSlider from "../components/MovieSlider/MovieSlider";
import Footer from "../components/Footer/Footer";
import Chatbot from "../components/ChatBot/Chatbot";

const GENRES = [
  "Hành động",
  "Tình cảm",
  "Khoa học viễn tưởng",
  "Kinh dị",
  "Hài hước",
  "Phiêu lưu",
  "Hoạt hình",
  "Gia đình",
];

const Home = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const genreSectionRef = useRef(null);

  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);

    // scroll xuống danh sách phim
    setTimeout(() => {
      genreSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />

      {/* 🤖 CHATBOT */}
      <div className="fixed bottom-6 right-6 z-[999]">
        <Chatbot />
      </div>

      <div className="relative z-10 space-y-16 pb-24 pt-10">

        {/* 🔥 TRENDING */}
        <MovieSlider title="🔥 Phim đang thịnh hành" endpoint="/trending" />

        {/* ⭐ TOP */}
        <MovieSlider title="⭐ Phim được đánh giá cao" endpoint="/?sort=rating" />

        {/* 🆕 NEW */}
        <MovieSlider title="🆕 Phim mới cập nhật" endpoint="/?sort=createdAt" />

        {/* 🎭 GENRE GRID */}
        <section className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-black mb-6">
            🎭 Khám phá theo thể loại
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {GENRES.map((g) => (
              <div
                key={g}
                onClick={() => handleSelectGenre(g)}
                className={`
                  cursor-pointer
                  bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]
                  border border-white/10
                  rounded-xl p-6
                  transition
                  hover:from-red-600 hover:to-red-800
                  ${selectedGenre === g ? "ring-2 ring-red-600" : ""}
                `}
              >
                <h3 className="font-bold text-lg">{g}</h3>
                <p className="text-sm text-gray-400">
                  Xem ngay →
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 🎬 PHIM THEO THỂ LOẠI (HIỆN Ở DƯỚI) */}
        {selectedGenre && (
          <div ref={genreSectionRef}>
            <MovieSlider
              title={`🎬 Phim thể loại: ${selectedGenre}`}
              endpoint={`/genre/${encodeURIComponent(selectedGenre)}`}
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
