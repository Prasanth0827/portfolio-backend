const { errorResponse } = require('../utils/apiResponse');

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json(
      errorResponse(errors.join(', '), { errors })
    );
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json(
      errorResponse(`${field} already exists`)
    );
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json(
      errorResponse(`Invalid ${err.path}: ${err.value}`)
    );
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json(
      errorResponse('Invalid token')
    );
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json(
      errorResponse('Token expired')
    );
  }

  // Multer file upload errors
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json(
        errorResponse('File too large. Maximum size is 5MB')
      );
    }
    return res.status(400).json(
      errorResponse(`File upload error: ${err.message}`)
    );
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json(
    errorResponse(message, {
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    })
  );
};

/**
 * Handle 404 - Not Found
 */
const notFound = (req, res, next) => {
  res.status(404).json(
    errorResponse(`Route not found: ${req.originalUrl}`)
  );
};

module.exports = { errorHandler, notFound };

