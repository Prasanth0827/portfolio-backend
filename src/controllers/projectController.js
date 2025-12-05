const Project = require('../models/Project');
const { successResponse, errorResponse } = require('../utils/apiResponse');

/**
 * @desc    Get all projects with pagination and search
 * @route   GET /api/projects
 * @access  Public
 */
const getProjects = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.q || '';
    const status = req.query.status || 'published';

    // Build query
    let query = { status };

    // Add text search if query provided
    if (search) {
      query.$text = { $search: search };
    }

    // Execute query with pagination
    const projects = await Project.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count
    const total = await Project.countDocuments(query);
    const pages = Math.ceil(total / limit);

    res.status(200).json(
      successResponse('Projects retrieved successfully', projects, {
        total,
        page,
        pages,
        limit
      })
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single project by ID
 * @route   GET /api/projects/:id
 * @access  Public
 */
const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json(
        errorResponse('Project not found')
      );
    }

    res.status(200).json(
      successResponse('Project retrieved successfully', project)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new project
 * @route   POST /api/projects
 * @access  Private
 */
const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json(
      successResponse('Project created successfully', project)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update project
 * @route   PUT /api/projects/:id
 * @access  Private
 */
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!project) {
      return res.status(404).json(
        errorResponse('Project not found')
      );
    }

    res.status(200).json(
      successResponse('Project updated successfully', project)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete project
 * @route   DELETE /api/projects/:id
 * @access  Private
 */
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json(
        errorResponse('Project not found')
      );
    }

    res.status(200).json(
      successResponse('Project deleted successfully', { id: req.params.id })
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get featured projects
 * @route   GET /api/projects/featured
 * @access  Public
 */
const getFeaturedProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ featured: true, status: 'published' })
      .sort({ order: 1, createdAt: -1 })
      .limit(6)
      .lean();

    res.status(200).json(
      successResponse('Featured projects retrieved successfully', projects)
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getFeaturedProjects
};

