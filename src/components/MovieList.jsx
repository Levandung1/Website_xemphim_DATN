import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/movieSlice";

const MovieList = ({ genre, year, rating }) => {
  const dispatch = useDispatch();
  const { movies, status, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies({ genre, year, rating }));
  }, [dispatch, genre, year, rating]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Movie List</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>{movie.title} ({movie.year}) - {movie.genre.join(", ")}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
