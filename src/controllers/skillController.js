const Skill = require('../models/Skill');
const { successResponse, errorResponse } = require('../utils/apiResponse');

/**
 * @desc    Get all skills
 * @route   GET /api/skills
 * @access  Public
 */
const getSkills = async (req, res, next) => {
  try {
    const category = req.query.category;
    
    // Build query
    const query = category ? { category } : {};

    const skills = await Skill.find(query)
      .sort({ category: 1, order: 1 })
      .lean();

    // Group by category if no specific category requested
    let responseData = skills;
    if (!category) {
      responseData = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
      }, {});
    }

    res.status(200).json(
      successResponse('Skills retrieved successfully', responseData)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single skill
 * @route   GET /api/skills/:id
 * @access  Public
 */
const getSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json(
        errorResponse('Skill not found')
      );
    }

    res.status(200).json(
      successResponse('Skill retrieved successfully', skill)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new skill
 * @route   POST /api/skills
 * @access  Private
 */
const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);

    res.status(201).json(
      successResponse('Skill created successfully', skill)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update skill
 * @route   PUT /api/skills/:id
 * @access  Private
 */
const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!skill) {
      return res.status(404).json(
        errorResponse('Skill not found')
      );
    }

    res.status(200).json(
      successResponse('Skill updated successfully', skill)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete skill
 * @route   DELETE /api/skills/:id
 * @access  Private
 */
const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json(
        errorResponse('Skill not found')
      );
    }

    res.status(200).json(
      successResponse('Skill deleted successfully', { id: req.params.id })
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill
};

