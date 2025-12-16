import express from 'express';
import { getAllCategories, addCategory, getCategoriesFromMovies } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', addCategory);
router.get("/from-movies", getCategoriesFromMovies);
export default router;
