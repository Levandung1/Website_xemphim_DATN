import Category from '../models/Category.js';
import Movie from '../models/Movie.js';

// Lấy tất cả thể loại
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Thêm thể loại
export const addCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getCategoriesFromMovies = async (req, res) => {
  try {
    const movies = await Movie.find({}, { genre: 1 });

    const map = new Map();

    movies.forEach(movie => {
      if (!movie.genre) return;

      movie.genre
        .split(",")
        .map(g => g.trim())
        .forEach(g => {
          if (!map.has(g)) {
            map.set(g, 1);
          } else {
            map.set(g, map.get(g) + 1);
          }
        });
    });

    const categories = Array.from(map.entries()).map(
      ([name, count], index) => ({
        id: index + 1,
        name,
        count
      })
    );

    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Cannot get categories from movies" });
  }
};
