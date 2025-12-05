const { uploadToCloudinary } = require('../config/cloudinary');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const fs = require('fs').promises;
const path = require('path');

/**
 * @desc    Upload image to Cloudinary
 * @route   POST /api/upload
 * @access  Private
 */
const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json(
        errorResponse('Please upload an image file')
      );
    }

    // Check if Cloudinary is configured
    const hasCloudinary = process.env.CLOUDINARY_CLOUD_NAME && 
                          process.env.CLOUDINARY_API_KEY && 
                          process.env.CLOUDINARY_API_SECRET;

    // If Cloudinary not configured, return base64 as fallback
    if (!hasCloudinary) {
      console.log('⚠️  Cloudinary not configured, returning base64 data URL');
      
      const base64 = req.file.buffer.toString('base64');
      const mimeType = req.file.mimetype;
      const dataUrl = `data:${mimeType};base64,${base64}`;
      
      return res.status(200).json(
        successResponse('Image processed (base64 fallback - Cloudinary not configured)', {
          url: dataUrl,
          imageUrl: dataUrl,
          publicId: null,
          width: null,
          height: null,
          format: req.file.mimetype.split('/')[1],
          fallback: true,
          message: 'Using base64 storage. For production, configure Cloudinary for better performance.'
        })
      );
    }

    // For memory storage (buffer), we need to write to temp file first
    let filePath = req.file.path;
    let isTemp = false;

    if (req.file.buffer) {
      // Create temp file from buffer
      const tempDir = path.join(__dirname, '../../temp');
      await fs.mkdir(tempDir, { recursive: true });
      
      filePath = path.join(tempDir, `${Date.now()}-${req.file.originalname}`);
      await fs.writeFile(filePath, req.file.buffer);
      isTemp = true;
    }

    try {
      // Upload to Cloudinary
      const result = await uploadToCloudinary(filePath, 'portfolio');

      // Clean up temp file if created
      if (isTemp) {
        await fs.unlink(filePath).catch(err => console.error('Error deleting temp file:', err));
      }

      res.status(200).json(
        successResponse('Image uploaded successfully', {
          url: result.url,
          publicId: result.publicId,
          width: result.width,
          height: result.height,
          format: result.format
        })
      );
    } catch (uploadError) {
      // Clean up temp file on error
      if (isTemp) {
        await fs.unlink(filePath).catch(err => console.error('Error deleting temp file:', err));
      }
      throw uploadError;
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Upload multiple images
 * @route   POST /api/upload/multiple
 * @access  Private
 */
const uploadMultipleImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json(
        errorResponse('Please upload at least one image file')
      );
    }

    const hasCloudinary = process.env.CLOUDINARY_CLOUD_NAME && 
                          process.env.CLOUDINARY_API_KEY && 
                          process.env.CLOUDINARY_API_SECRET;

    if (!hasCloudinary) {
      return res.status(500).json(
        errorResponse('Image upload service is not configured')
      );
    }

    const uploadPromises = req.files.map(async (file) => {
      let filePath = file.path;
      let isTemp = false;

      if (file.buffer) {
        const tempDir = path.join(__dirname, '../../temp');
        await fs.mkdir(tempDir, { recursive: true });
        
        filePath = path.join(tempDir, `${Date.now()}-${file.originalname}`);
        await fs.writeFile(filePath, file.buffer);
        isTemp = true;
      }

      try {
        const result = await uploadToCloudinary(filePath, 'portfolio');
        
        if (isTemp) {
          await fs.unlink(filePath).catch(err => console.error('Error deleting temp file:', err));
        }

        return {
          url: result.url,
          publicId: result.publicId,
          width: result.width,
          height: result.height,
          format: result.format
        };
      } catch (error) {
        if (isTemp) {
          await fs.unlink(filePath).catch(err => console.error('Error deleting temp file:', err));
        }
        throw error;
      }
    });

    const results = await Promise.all(uploadPromises);

    res.status(200).json(
      successResponse('Images uploaded successfully', results)
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadImage,
  uploadMultipleImages
};

