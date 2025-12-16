import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { FaPlay } from 'react-icons/fa';

const Container = styled.div`
  min-height: 100vh;
  background: #141414;
  padding-top: 60px;
  padding-bottom: 40px;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 30px;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const MovieCard = styled.div`
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ContinueButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(229, 9, 20, 0.9);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  ${MovieCard}:hover & {
    opacity: 1;
  }

  &:hover {
    background: rgba(229, 9, 20, 1);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
`;

const MovieInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  border-radius: 0 0 8px 8px;
  z-index: 1;
`;

const MovieTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 16px;
`;

const WatchTime = styled.div`
  color: #e50914;
  font-size: 14px;
  margin-top: 5px;
`;

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m ${remainingSeconds}s`;
  }
};

const WatchHistory = () => {
  const [watchHistory, setWatchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchWatchHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/watch/history/${user._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setWatchHistory(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching watch history:', error);
        setLoading(false);
      }
    };

    fetchWatchHistory();
  }, [user, token, navigate]);

  const handleMovieClick = (movieId, lastWatchedTime) => {
    navigate(`/movie/${movieId}`, { state: { lastWatchedTime } });
  };

  const handleContinueWatching = (e, movieId, lastWatchedTime) => {
    e.stopPropagation();
    navigate(`/movie/${movieId}`, { 
      state: { 
        lastWatchedTime,
        autoPlay: true 
      } 
    });
  };

  if (loading) {
    return (
      <Container>
        <Navbar />
        <Content>
          <Title>Đang tải...</Title>
        </Content>
        <Footer />
      </Container>
    );
  }

  return (
    <Container>
      <Navbar />
      <Content>
        <Title>Danh sách phim đã xem</Title>
        <MovieGrid>
          {watchHistory.map((item) => (
            <MovieCard 
              key={item._id} 
              onClick={() => handleMovieClick(item.movie._id, item.lastWatchedTime)}
            >
              <MoviePoster src={item.movie.posterUrl} alt={item.movie.title} />
              <ContinueButton 
                onClick={(e) => handleContinueWatching(e, item.movie._id, item.lastWatchedTime)}
              >
                <FaPlay /> Xem tiếp
              </ContinueButton>
              <MovieInfo>
                <MovieTitle>{item.movie.title}</MovieTitle>
                <WatchTime>Đã xem: {formatTime(item.lastWatchedTime)}</WatchTime>
              </MovieInfo>
            </MovieCard>
          ))}
        </MovieGrid>
      </Content>
      <Footer />
    </Container>
  );
};

export default WatchHistory; 