import express from 'express';
import { uploadFile, deleteFile } from '../controllers/uploadController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Route để upload file
router.post('/', upload.single('file'), uploadFile);

// Xóa file
router.delete('/:fileUrl', deleteFile);

export default router; 