import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import MovieSlider from "../components/MovieSlider/MovieSlider";
import Footer from "../components/Footer/Footer";
import Chatbot from "../components/ChatBot/Chatbot";

const Home = () => {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />

      {/* 🤖 CHATBOT – NỔI BÊN PHẢI */}
      <div className="fixed bottom-6 right-6 z-[999]">
        <Chatbot />
      </div>

      <div className="relative z-10 space-y-16 pb-24 pt-10">

        {/* 🔥 TRENDING */}
        <MovieSlider
          title="🔥 Phim đang thịnh hành"
          endpoint="/trending"
        />

        {/* ⭐ TOP RATED */}
        <MovieSlider
          title="⭐ Phim được đánh giá cao"
          endpoint="/?sort=rating"
        />

        {/* 🆕 NEW MOVIES */}
        <MovieSlider
          title="🆕 Phim mới cập nhật"
          endpoint="/?sort=createdAt"
        />

        {/* 🎬 ACTION */}
        <MovieSlider
          title="💥 Phim hành động"
          endpoint="/genre/Hành động"
        />

        {/* 👻 HORROR */}
        <MovieSlider
          title="👻 Phim kinh dị"
          endpoint="/genre/Kinh dị"
        />

        {/* ❤️ ROMANCE */}
        <MovieSlider
          title="❤️ Phim tình cảm"
          endpoint="/genre/Tình cảm"
        />

        {/* 🚀 SCI-FI */}
        <MovieSlider
          title="🚀 Khoa học viễn tưởng"
          endpoint="/genre/Khoa học viễn tưởng"
        />

        {/* 🎨 ANIMATION */}
        <MovieSlider
          title="🎨 Hoạt hình"
          endpoint="/genre/Hoạt hình"
        />

        {/* 🎭 GENRES GRID */}
        <section className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-black mb-6">
            🎭 Khám phá theo thể loại
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              "Hành động",
              "Tình cảm",
              "Khoa học viễn tưởng",
              "Kinh dị",
              "Hài hước",
              "Phiêu lưu",
              "Hoạt hình",
              "Gia đình",
            ].map((g) => (
              <div
                key={g}
                className="
                  group cursor-pointer
                  bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]
                  border border-white/10
                  rounded-xl p-6
                  hover:from-red-600 hover:to-red-800
                  transition
                "
              >
                <h3 className="font-bold text-lg group-hover:text-white">
                  {g}
                </h3>
                <p className="text-sm text-gray-400 group-hover:text-white/80">
                  Xem ngay →
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
