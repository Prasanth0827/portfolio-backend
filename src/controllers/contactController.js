const ContactMessage = require('../models/ContactMessage');
const { successResponse, errorResponse } = require('../utils/apiResponse');

/**
 * @desc    Submit contact message
 * @route   POST /api/contact
 * @access  Public
 */
const submitMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // Get IP address
    const ipAddress = req.ip || req.connection.remoteAddress;

    const contactMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
      ipAddress
    });

    res.status(201).json(
      successResponse('Message sent successfully! We will get back to you soon.', {
        id: contactMessage._id,
        createdAt: contactMessage.createdAt
      })
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all contact messages
 * @route   GET /api/contact
 * @access  Private
 */
const getMessages = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;
    const read = req.query.read;

    // Build query
    const query = {};
    if (read !== undefined) {
      query.read = read === 'true';
    }

    const messages = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await ContactMessage.countDocuments(query);
    const pages = Math.ceil(total / limit);

    res.status(200).json(
      successResponse('Messages retrieved successfully', messages, {
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
 * @desc    Get single message
 * @route   GET /api/contact/:id
 * @access  Private
 */
const getMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json(
        errorResponse('Message not found')
      );
    }

    // Mark as read
    if (!message.read) {
      message.read = true;
      await message.save();
    }

    res.status(200).json(
      successResponse('Message retrieved successfully', message)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Mark message as read
 * @route   PUT /api/contact/:id/read
 * @access  Private
 */
const markAsRead = async (req, res, next) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json(
        errorResponse('Message not found')
      );
    }

    res.status(200).json(
      successResponse('Message marked as read', message)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete message
 * @route   DELETE /api/contact/:id
 * @access  Private
 */
const deleteMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json(
        errorResponse('Message not found')
      );
    }

    res.status(200).json(
      successResponse('Message deleted successfully', { id: req.params.id })
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitMessage,
  getMessages,
  getMessage,
  markAsRead,
  deleteMessage
};

