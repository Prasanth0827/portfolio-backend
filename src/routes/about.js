const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getAbout,
  updateAbout,
  addExperience,
  addEducation
} = require('../controllers/aboutController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Validation rules
const aboutValidation = [
  body('title').optional().trim(),
  body('bio').optional().trim()
    .isLength({ max: 5000 }).withMessage('Bio cannot exceed 5000 characters'),
  body('shortBio').optional().trim()
    .isLength({ max: 500 }).withMessage('Short bio cannot exceed 500 characters'),
  validate
];

const experienceValidation = [
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('position').trim().notEmpty().withMessage('Position is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').optional().isISO8601().withMessage('End date must be valid'),
  body('current').optional().isBoolean(),
  validate
];

const educationValidation = [
  body('institution').trim().notEmpty().withMessage('Institution name is required'),
  body('degree').trim().notEmpty().withMessage('Degree is required'),
  body('startDate').optional().isISO8601().withMessage('Start date must be valid'),
  body('endDate').optional().isISO8601().withMessage('End date must be valid'),
  validate
];

// Routes
router.get('/', getAbout);
router.put('/', protect, aboutValidation, updateAbout);
router.post('/experience', protect, experienceValidation, addExperience);
router.post('/education', protect, educationValidation, addEducation);

module.exports = router;

