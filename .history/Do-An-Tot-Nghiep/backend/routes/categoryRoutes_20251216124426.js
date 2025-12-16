import express from 'express';
import { getAllCategories, addCategory, migrateCategoriesFromMovies } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', addCategory);
router.post("/migrate", migrateCategoriesFromMovies);
export default router;
