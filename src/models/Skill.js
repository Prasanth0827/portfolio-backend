const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    unique: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other'],
    default: 'Other'
  },
  proficiency: {
    type: Number,
    min: [0, 'Proficiency must be between 0 and 100'],
    max: [100, 'Proficiency must be between 0 and 100'],
    default: 50
  },
  icon: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for sorting
skillSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('Skill', skillSchema);

