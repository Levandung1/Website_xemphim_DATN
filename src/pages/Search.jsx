import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar/Navbar';
import MovieCard from '../components/MovieCard/MovieCard';
import Footer from '../components/Footer/Footer';

const Container = styled.div`
  min-height: 100vh;
  background: #141414;
  padding: 80px 30px 30px;
`;

const SearchContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 18px;
  background: #333;
  border: none;
  border-radius: 4px;
  color: white;
  margin-bottom: 30px;

  &:focus {
    outline: none;
    background: #454545;
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const NoResults = styled.div`
  color: #666;
  text-align: center;
  font-size: 18px;
  padding: 40px;
`;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Here you would typically make an API call to search for movies
    // For now, we'll just simulate it
    if (value.trim()) {
      fetch(`http://localhost:5000/api/movies/search?query=${value}`)
        .then(res => res.json())
        .then(data => setResults(data))
        .catch(err => console.log(err));
    } else {
      setResults([]);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Tìm kiếm phim..."
            value={searchTerm}
            onChange={handleSearch}
          />
          {results.length > 0 ? (
            <ResultsGrid>
              {results.map((movie) => (
                <MovieCard key={movie._id} img={movie.posterUrl} />
              ))}
            </ResultsGrid>
          ) : (
            <NoResults>
              {searchTerm ? 'Không tìm thấy kết quả phù hợp' : 'Nhập từ khóa để tìm kiếm phim'}
            </NoResults>
          )}
        </SearchContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Search; 