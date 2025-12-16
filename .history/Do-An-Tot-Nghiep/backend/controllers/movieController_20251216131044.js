import Movie from '../models/Movie.js';
import Category from "../models/Category.js";
// Lấy tất cả phim
export const getMovies = async (req, res) => {
  try {
    const { genre, year, sort = "createdAt" } = req.query;
    let query = {};

    if (genre && genre !== "All") {
      query.genre = { $regex: genre, $options: "i" };
    }

    if (year) {
      query.year = Number(year);
    }

    const movies = await Movie.find(query).sort({ [sort]: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error getting movies" });
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
export const createMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      year,
      genre, // STRING
      director,
      actors,
      country,
      duration,
      rating,
      posterUrl,
      backdropUrl,
      trailerUrl
    } = req.body;

    // 1️⃣ Tạo movie (genre LƯU NGUYÊN STRING)
    const movie = await Movie.create({
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

    // 2️⃣ XỬ LÝ CATEGORY
    const genres = genre.split(",").map(g => g.trim());

    for (const g of genres) {
      const existing = await Category.findOne({ name: g });

      if (existing) {
        await Category.updateOne(
          { _id: existing._id },
          { $inc: { movieCount: 1 } }
        );
      } else {
        await Category.create({
          name: g,
          movieCount: 1
        });
      }
    }

    res.status(201).json(movie);
  } catch (err) {
    console.error("Error creating movie:", err);
    res.status(500).json({ message: "Error creating movie" });
  }
};
export const updateMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      year,
      genre, // STRING
      director,
      actors,
      country,
      duration,
      rating,
      posterUrl,
      backdropUrl,
      trailerUrl
    } = req.body;

    const oldMovie = await Movie.findById(req.params.id);
    if (!oldMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const oldGenres = oldMovie.genre
      .split(",")
      .map(g => g.trim());

    const newGenres = genre
      .split(",")
      .map(g => g.trim());

    // 👉 Genre bị xóa
    const removed = oldGenres.filter(g => !newGenres.includes(g));
    // 👉 Genre mới thêm
    const added = newGenres.filter(g => !oldGenres.includes(g));

    // Trừ category bị xóa
    for (const g of removed) {
      await Category.findOneAndUpdate(
        { name: g, movieCount: { $gt: 0 } },
        { $inc: { movieCount: -1 } }
      );
    }

    // Cộng category mới
    for (const g of added) {
      const existing = await Category.findOne({ name: g });
      if (existing) {
        await Category.updateOne(
          { _id: existing._id },
          { $inc: { movieCount: 1 } }
        );
      } else {
        await Category.create({
          name: g,
          movieCount: 1
        });
      }
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
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

    res.json(updatedMovie);
  } catch (err) {
    console.error("Error updating movie:", err);
    res.status(500).json({ message: "Error updating movie" });
  }
};
// Xóa phim
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const genres = movie.genre
      .split(",")
      .map(g => g.trim());

    for (const g of genres) {
      await Category.findOneAndUpdate(
        { name: g, movieCount: { $gt: 0 } },
        { $inc: { movieCount: -1 } }
      );
    }

    await movie.deleteOne();
    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting movie" });
  }
};
// Lấy phim theo thể loại
export const getMoviesByGenre = async (req, res) => {
  try {
    const { genre } = req.params;

    const movies = await Movie.find({
      genre: { $regex: genre, $options: "i" }
    }).sort({ createdAt: -1 });

    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error getting movies by genre" });
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