import path from 'path';
import fs from 'fs';
import upload from '../middleware/upload.js';

export const uploadFile = async (req, res) => {
  try {
    console.log('Upload request received');
    console.log('Request file:', req.file);
    console.log('Request body:', req.body);

    if (!req.file) {
      console.log('No file in request');
      return res.status(400).json({ message: 'Không có file được tải lên' });
    }

    // Trả về URL của file đã upload
    const fileUrl = `/uploads/${req.file.filename}`;
    console.log('File uploaded successfully:', fileUrl);
    res.status(200).json({ fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Lỗi khi tải lên file', error: error.message });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { fileUrl } = req.params;
    const filePath = path.join(process.cwd(), 'uploads', fileUrl);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.status(200).json({ message: 'File deleted successfully' });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Error deleting file' });
  }
}; 