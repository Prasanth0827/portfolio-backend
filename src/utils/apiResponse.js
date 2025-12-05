/**
 * Standard success response format
 * @param {string} message - Success message
 * @param {any} data - Response data
 * @param {object} meta - Additional metadata (pagination, etc.)
 * @returns {object} Formatted response
 */
const successResponse = (message = 'Success', data = null, meta = null) => {
  const response = {
    success: true,
    message
  };

  if (data !== null) {
    response.data = data;
  }

  if (meta !== null) {
    response.meta = meta;
  }

  return response;
};

/**
 * Standard error response format
 * @param {string} message - Error message
 * @param {object} details - Additional error details
 * @returns {object} Formatted error response
 */
const errorResponse = (message = 'An error occurred', details = null) => {
  const response = {
    success: false,
    error: message
  };

  if (details !== null) {
    response.details = details;
  }

  return response;
};

module.exports = {
  successResponse,
  errorResponse
};

