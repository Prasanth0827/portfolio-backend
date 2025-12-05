const User = require('../models/User');
const { generateToken } = require('../middleware/auth');
const { successResponse, errorResponse } = require('../utils/apiResponse');

/**
 * @desc    Register new admin user
 * @route   POST /api/auth/register
 * @access  Public (only if ALLOW_REGISTER=true)
 */
const register = async (req, res, next) => {
  try {
    // Check if registration is allowed
    if (process.env.ALLOW_REGISTER !== 'true') {
      return res.status(403).json(
        errorResponse('Registration is currently disabled')
      );
    }

    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(
        errorResponse('User with this email already exists')
      );
    }

    // Create user
    const user = await User.create({
      email,
      password,
      name
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json(
      successResponse('User registered successfully', {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token
      })
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json(
        errorResponse('Please provide email and password')
      );
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json(
        errorResponse('Invalid credentials')
      );
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json(
        errorResponse('Invalid credentials')
      );
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json(
      successResponse('Login successful', {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token
      })
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json(
      successResponse('User profile retrieved', {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          createdAt: user.createdAt
        }
      })
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/me
 * @access  Private
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user.id);

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.status(200).json(
      successResponse('Profile updated successfully', {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      })
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile
};

