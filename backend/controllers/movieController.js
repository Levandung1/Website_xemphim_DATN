import Movie from '../models/Movie.js';

// Lấy tất cả phim
export const getMovies = async (req, res) => {
  try {
    const { genre, year, sort = 'createdAt' } = req.query;
    let query = {};

    // Lọc theo thể loại
    if (genre) {
      query.genre = genre;
    }

    // Lọc theo năm
    if (year) {
      query.year = parseInt(year);
    }

    const movies = await Movie.find(query)
      .sort({ [sort]: -1 });
      
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error getting movies:', error);
    res.status(500).json({ message: 'Error getting movies' });
  }
};

// Lấy chi tiết một phim
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Tăng lượt xem
    movie.views += 1;
    await movie.save();

    res.status(200).json(movie);
  } catch (error) {
    console.error('Error getting movie:', error);
    res.status(500).json({ message: 'Error getting movie' });
  }
};

// Thêm phim mới
export const createMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      year,
      genre,
      director,
      actors,
      country,
      duration,
      rating,
      posterUrl,
      backdropUrl,
      trailerUrl
    } = req.body;

    const movie = new Movie({
      title,
      description,
      year,
      genre,
      director,
      actors,
      country,
      duration,
      rating,
      posterUrl,
      backdropUrl,
      trailerUrl
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    console.error('Error creating movie:', error);
    res.status(500).json({ message: 'Error creating movie' });
  }
};

// Cập nhật phim
export const updateMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      year,
      genre,
      director,
      actors,
      country,
      duration,
      rating,
      posterUrl,
      backdropUrl,
      trailerUrl
    } = req.body;

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        year,
        genre,
        director,
        actors,
        country,
        duration,
        rating,
        posterUrl,
        backdropUrl,
        trailerUrl
      },
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).json({ message: 'Error updating movie' });
  }
};

// Xóa phim
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ message: 'Error deleting movie' });
  }
};

// Lấy phim theo thể loại
export const getMoviesByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const movies = await Movie.find({ genre })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error getting movies by genre:', error);
    res.status(500).json({ message: 'Error getting movies by genre' });
  }
};

// Tìm kiếm phim
export const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const movies = await Movie.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { director: { $regex: query, $options: 'i' } },
        { actors: { $regex: query, $options: 'i' } }
      ]
    }).sort({ rating: -1 });

    res.status(200).json(movies);
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({ message: 'Error searching movies' });
  }
};

// Lấy phim trending (dựa trên lượt xem)
export const getTrendingMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
      .sort({ views: -1, rating: -1 })
      .limit(10);
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error getting trending movies:', error);
    res.status(500).json({ message: 'Error getting trending movies' });
  }
};

// Cập nhật trailer
export const updateTrailer = async (req, res) => {
  try {
    const { trailerUrl } = req.body;
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { trailerUrl },
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.error('Error updating trailer:', error);
    res.status(500).json({ message: 'Error updating trailer' });
  }
};