import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import MovieSlider from "../components/MovieSlider/MovieSlider";
import Footer from "../components/Footer/Footer";
import Chatbot from "../components/ChatBot/Chatbot";

const Home = () => {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Navbar />
      <Hero />

      <div className="relative z-10">
        <MovieSlider title="🔥 Thịnh Hành" endpoint="" />
      </div>

      <Chatbot />
      <Footer />
    </div>
  );
};

export default Home;
