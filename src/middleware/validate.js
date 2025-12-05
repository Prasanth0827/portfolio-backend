const { validationResult } = require('express-validator');
const { errorResponse } = require('../utils/apiResponse');

/**
 * Validation middleware to handle express-validator results
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path || error.param,
      message: error.msg
    }));

    return res.status(400).json(
      errorResponse('Validation failed', { errors: errorMessages })
    );
  }
  
  next();
};

module.exports = validate;

