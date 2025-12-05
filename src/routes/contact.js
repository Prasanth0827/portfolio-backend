const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  submitMessage,
  getMessages,
  getMessage,
  markAsRead,
  deleteMessage
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Validation rules
const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('subject').optional().trim()
    .isLength({ max: 200 }).withMessage('Subject cannot exceed 200 characters'),
  body('message').trim().notEmpty().withMessage('Message is required')
    .isLength({ max: 2000 }).withMessage('Message cannot exceed 2000 characters'),
  validate
];

// Public routes
router.post('/', contactValidation, submitMessage);

// Protected routes
router.get('/', protect, getMessages);
router.get('/:id', protect, getMessage);
router.put('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteMessage);

module.exports = router;

