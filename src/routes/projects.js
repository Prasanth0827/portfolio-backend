const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getFeaturedProjects
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Validation rules
const projectValidation = [
  body('title').trim().notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description').trim().notEmpty().withMessage('Description is required')
    .isLength({ max: 2000 }).withMessage('Description cannot exceed 2000 characters'),
  body('tech').optional().isArray().withMessage('Tech must be an array'),
  body('liveUrl').optional().isURL().withMessage('Live URL must be valid'),
  body('repoUrl').optional().isURL().withMessage('Repository URL must be valid'),
  body('images').optional().isArray().withMessage('Images must be an array'),
  validate
];

// Public routes
router.get('/featured', getFeaturedProjects);
router.get('/', getProjects);
router.get('/:id', getProject);

// Protected routes
router.post('/', protect, projectValidation, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;

