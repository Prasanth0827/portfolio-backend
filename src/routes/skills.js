const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill
} = require('../controllers/skillController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Validation rules
const skillValidation = [
  body('name').trim().notEmpty().withMessage('Skill name is required'),
  body('category').isIn(['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other'])
    .withMessage('Invalid category'),
  body('proficiency').optional().isInt({ min: 0, max: 100 })
    .withMessage('Proficiency must be between 0 and 100'),
  validate
];

// Public routes
router.get('/', getSkills);
router.get('/:id', getSkill);

// Protected routes
router.post('/', protect, skillValidation, createSkill);
router.put('/:id', protect, updateSkill);
router.delete('/:id', protect, deleteSkill);

module.exports = router;

