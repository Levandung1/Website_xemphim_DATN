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
export const migrateCategoriesFromMovies = async (req, res) => {
  try {
    // 1️⃣ Xóa category cũ (OPTIONAL)
    await Category.deleteMany({});

    const movies = await Movie.find();
    const map = {};

    // 2️⃣ Gom genre
    for (const movie of movies) {
      if (!movie.genre) continue;

      const genres = movie.genre
        .split(",")
        .map(g => g.trim());

      for (const g of genres) {
        map[g] = (map[g] || 0) + 1;
      }
    }

    // 3️⃣ Insert category
    const categories = Object.entries(map).map(([name, count]) => ({
      name,
      movieCount: count
    }));

    await Category.insertMany(categories);

    res.json({
      message: "Category migrated successfully",
      total: categories.length,
      categories
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Migration failed" });
  }
};
