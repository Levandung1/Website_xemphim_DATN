import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { FaPlay, FaStar, FaHeart } from 'react-icons/fa';

const Container = styled.div`
  min-height: 100vh;
  background: #141414;
`;

const MovieHero = styled.div`
  position: relative;
  height: 70vh;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.8) 100%
  ),
  url(\${props => props.backdrop}) no-repeat center center/cover;
`;

const MovieContent = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50px;
  right: 50px;
  display: flex;
  gap: 30px;
  align-items: flex-end;
`;

const PosterContainer = styled.div`
  flex-shrink: 0;
`;

const Poster = styled.img`
  width: 300px;
  height: 450px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  border: 3px solid rgba(255, 255, 255, 0.2);
`;

const InfoContainer = styled.div`
  flex-grow: 1;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 15px;
`;

const Metadata = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  font-size: 1.1rem;
  color: #ccc;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #ffd700;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 800px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
`;

const Button = styled.button`
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:first-child {
    background-color: #e50914;
    color: white;

    &:hover {
      background-color: #b2070e;
    }
  }

  &:last-child {
    background-color: rgba(109, 109, 110, 0.7);
    color: white;

    &:hover {
      background-color: rgba(109, 109, 110, 0.4);
    }
  }
`;

const MovieDetails = styled.div`
  padding: 50px;
  color: white;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #e5e5e5;
`;

const CommentSection = styled.div`
  margin-top: 40px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
`;

const CommentTitle = styled.h3`
  color: white;
  margin-bottom: 20px;
`;

const CommentForm = styled.form`
  margin-bottom: 20px;
`;

const CommentInput = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const UserNameInput = styled.input`
  width: 200px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.9);
`;

const CommentTextInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.9);
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CommentItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 4px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const UserName = styled.span`
  color: #e50914;
  font-weight: bold;
`;

const CommentDate = styled.span`
  color: #999;
  font-size: 0.9em;
`;

const CommentContent = styled.p`
  color: white;
  margin: 0;
`;

const UserInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 4px;
  color: #e50914;
  font-weight: bold;
  width: 200px;
`;

const VideoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const VideoContainer = styled.div`
  width: 80%;
  max-width: 1200px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 5px 10px;
  
  &:hover {
    color: #e50914;
  }
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: auto;
  max-height: 80vh;
`;

const MovieDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [lastWatchedTime, setLastWatchedTime] = useState(location.state?.lastWatchedTime || 0);
  const [autoPlay, setAutoPlay] = useState(location.state?.autoPlay || false);
  const [videoRef, setVideoRef] = useState(null);
  const [isTimeSet, setIsTimeSet] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);

  useEffect(() => {
    // Kiểm tra user và token từ localStorage
    const loggedInUser = localStorage.getItem('user');
    const authToken = localStorage.getItem('token');
    if (loggedInUser && authToken) {
      setUser(JSON.parse(loggedInUser));
      setToken(authToken);
    }
    
    fetchMovie();
    fetchComments();
  }, [id]);

  useEffect(() => {
    if (location.state?.lastWatchedTime) {
      setLastWatchedTime(location.state.lastWatchedTime);
    }
    if (location.state?.autoPlay) {
      setAutoPlay(true);
      setShowVideo(true);
    }
  }, [location.state]);

  useEffect(() => {
    if (videoRef && lastWatchedTime > 0 && !isTimeSet) {
      videoRef.currentTime = lastWatchedTime;
      setIsTimeSet(true);
    }
  }, [videoRef, lastWatchedTime, isTimeSet]);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
      setMovie(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movie:', error);
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/comments/movie/${id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    // Kiểm tra đăng nhập
    if (!user || !token) {
      alert('Vui lòng đăng nhập để bình luận');
      return;
    }

    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await axios.post('http://localhost:5000/api/comments', {
        movieId: id,
        content: commentText.trim()
      }, config);
      
      // Thêm comment mới vào đầu danh sách
      setComments([response.data, ...comments]);
      // Reset form
      setCommentText('');
    } catch (error) {
      console.error('Error posting comment:', error);
      if (error.response?.status === 401) {
        alert('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
        // Có thể chuyển hướng về trang đăng nhập ở đây
        // navigate('/login');
      }
    }
  };

  const handleTimeUpdate = (e) => {
    setCurrentVideoTime(e.target.currentTime);
  };

  const handleCloseVideo = async () => {
    if (user && currentVideoTime > 0) {
      try {
        await axios.post('http://localhost:5000/api/watch/history', {
          userId: user._id,
          movieId: id,
          lastWatchedTime: currentVideoTime
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error('Error updating watch history:', error);
      }
    }
    setShowVideo(false);
    setIsTimeSet(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <Container>
      <Navbar />
      <MovieHero backdrop={movie.backdropUrl}>
        <MovieContent>
          <PosterContainer>
            <Poster src={movie.posterUrl} alt={movie.title} />
          </PosterContainer>
          <InfoContainer>
            <Title>{movie.title}</Title>
            <Metadata>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
              <Rating>
                <FaStar /> {movie.rating}
              </Rating>
            </Metadata>
            <Description>{movie.description}</Description>
            <ButtonGroup>
              <Button onClick={() => setShowVideo(true)}>
                <FaPlay /> Xem phim
              </Button>
              <Button>
                <FaHeart /> Yêu thích
              </Button>
            </ButtonGroup>
          </InfoContainer>
        </MovieContent>
      </MovieHero>

      {showVideo && (
        <VideoModal>
          <VideoContainer>
            <CloseButton onClick={handleCloseVideo}>×</CloseButton>
            <VideoPlayer 
              ref={setVideoRef}
              src={movie.trailerUrl} 
              controls 
              autoPlay={autoPlay}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsTimeSet(false)}
            />
          </VideoContainer>
        </VideoModal>
      )}

      <MovieDetails>
        <Section>
          <SectionTitle>Thông tin phim</SectionTitle>
          <p>Đạo diễn: {movie.director}</p>
          <p>Diễn viên: {movie.actors?.join(', ')}</p>
          <p>Thể loại: {movie.genre}</p>
          <p>Quốc gia: {movie.country}</p>
        </Section>
      </MovieDetails>
      <CommentSection>
        <CommentTitle>Bình luận</CommentTitle>
        <CommentForm onSubmit={handleCommentSubmit}>
          <CommentInput>
            {!user ? (
              <UserNameInput
                type="text"
                placeholder="Vui lòng đăng nhập để bình luận"
                disabled
              />
            ) : (
              <UserInfo>{user.username}</UserInfo>
            )}
            <CommentTextInput
              type="text"
              placeholder={user ? "Viết bình luận của bạn..." : "Vui lòng đăng nhập để bình luận"}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={!user}
              required
            />
          </CommentInput>
        </CommentForm>

        <CommentList>
          {comments.map((comment) => (
            <CommentItem key={comment._id}>
              <CommentHeader>
                <UserName>{comment.userName}</UserName>
                <CommentDate>
                  {new Date(comment.createdAt).toLocaleDateString('vi-VN')}
                </CommentDate>
              </CommentHeader>
              <CommentContent>{comment.content}</CommentContent>
            </CommentItem>
          ))}
        </CommentList>
      </CommentSection>
      <Footer />
    </Container>
  );
};

export default MovieDetail; 