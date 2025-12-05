const express = require('express');
const router = express.Router();
const { uploadImage, uploadMultipleImages } = require('../controllers/uploadController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Upload routes (protected)
router.post('/', protect, upload.single('image'), uploadImage);
router.post('/multiple', protect, upload.array('images', 10), uploadMultipleImages);

module.exports = router;

