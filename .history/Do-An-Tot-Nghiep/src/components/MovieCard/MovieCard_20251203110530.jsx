import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  width: 100%;
  height: 160px;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const MovieCard = ({ img, movieId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movieId}`);
  };

  return <Card img={img} onClick={handleClick} />;
};

export default MovieCard;
