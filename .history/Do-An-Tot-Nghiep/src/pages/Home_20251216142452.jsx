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

      {/* 🔥 CHATBOT STICKY – ĐÚNG CHỖ */}
      <div className="sticky top-24 z-50 flex justify-end pr-6">
        <Chatbot />
      </div>

      <div className="relative z-10 space-y-14 pb-20">
        <MovieSlider title="🔥 Thịnh hành" endpoint="/trending" />

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
                className="group cursor-pointer
                  bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]
                  border border-white/10
                  rounded-xl p-6
                  hover:from-red-600 hover:to-red-800
                  transition"
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
