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
export const getGenresFromMovies = async (req, res) => {
  try {
    const movies = await Movie.find({}, { genre: 1 });

    const set = new Set();

    movies.forEach(m => {
      if (!m.genre) return;

      m.genre
        .split(",")
        .map(g => g.trim())
        .forEach(g => set.add(g));
    });

    res.json([...set]); // ["Hành Động", "Khoa học"]
  } catch (err) {
    res.status(500).json({ message: "Cannot get genres" });
  }
};
