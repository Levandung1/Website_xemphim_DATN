import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from "../components/Hero/Hero";
import MovieSlider from "../components/MovieSlider/MovieSlider";
import Footer from "../components/Footer/Footer";
import Chatbot from "../components/ChatBot/Chatbot";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <MovieSlider title="Thịnh Hành" endpoint="" />

      {/* Chatbot luôn hiện trong home */}
      <Chatbot />

      <Footer />
    </>
  );
};

export default Home;
