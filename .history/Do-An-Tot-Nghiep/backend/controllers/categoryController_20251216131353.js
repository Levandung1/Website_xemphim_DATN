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

    const map = {};

    movies.forEach(movie => {
      if (!movie.genre) return;

      movie.genre
        .split(",")
        .map(g => g.trim())
        .forEach(raw => {
          const key = raw.toLowerCase(); // 🔥 chuẩn hoá để gộp
          const displayName =
            raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();

          if (!map[key]) {
            map[key] = {
              name: displayName,
              movieCount: 1
            };
          } else {
            map[key].movieCount++;
          }
        });
    });

    res.json(Object.values(map));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot get categories from movies" });
  }
};
