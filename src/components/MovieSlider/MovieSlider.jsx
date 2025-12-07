import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import "swiper/css";
import { FaSearch } from "react-icons/fa";

const Row = styled.div`
  width: 100%;
  padding: 30px;
  background: #141414;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const RowTitle = styled.h2`
  color: white;
`;

const SearchButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: darkred;
  }
`;

const MovieSlider = ({ title, endpoint }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies${endpoint}`)
      .then(res => setMovies(res.data))
      .catch(err => console.log(err));
  }, [endpoint]);

  const handleSearch = () => {
    // Navigate to search page or open search modal
    window.location.href = '/search';
  };

  return (
    <Row>
      <Header>
        <RowTitle>{title}</RowTitle>
        <SearchButton onClick={handleSearch}>
          <FaSearch /> Tìm kiếm
        </SearchButton>
      </Header>
      <Swiper 
        modules={[Autoplay]}
        slidesPerView={4} 
        spaceBetween={20}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie._id}>
            <MovieCard 
              img={movie.posterUrl} 
              movieId={movie._id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Row>
  );
};

export default MovieSlider;