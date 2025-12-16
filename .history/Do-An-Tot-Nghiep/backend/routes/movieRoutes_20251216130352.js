import express from 'express';
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getMoviesByGenre,
  searchMovies,
  getTrendingMovies,
  updateTrailer,
  getGenresFromMovies
} from '../controllers/movieController.js';

const router = express.Router();

// Public routes
router.get('/search', searchMovies);
router.get('/trending', getTrendingMovies);
router.get('/genre/:genre', getMoviesByGenre);
router.get('/:id', getMovieById);
router.get('/', getMovies);
router.get("/from-movies", getGenresFromMovies);
// Remove verifyToken for testing
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);
router.patch('/:id/trailer', updateTrailer);
export default router;
