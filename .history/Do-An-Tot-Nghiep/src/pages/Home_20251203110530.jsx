import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from "../components/Hero/Hero";
import MovieSlider from "../components/MovieSlider/MovieSlider";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <MovieSlider title="Thịnh Hành" endpoint="" />
  
      <Footer />
    </>
  );
};

export default Home;
