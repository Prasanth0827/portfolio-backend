const About = require('../models/About');
const { successResponse, errorResponse } = require('../utils/apiResponse');

/**
 * @desc    Get about content
 * @route   GET /api/about
 * @access  Public
 */
const getAbout = async (req, res, next) => {
  try {
    // Get the first (and should be only) about document
    let about = await About.findOne();

    // If no about document exists, create a default one
    if (!about) {
      about = await About.create({
        title: 'About Me',
        bio: 'Welcome to my portfolio! Update this section with your information.',
        shortBio: 'Full-stack developer passionate about building great web applications.'
      });
    }

    // Log what we're returning
    console.log('📡 Backend: Returning about data');
    console.log('📡 Backend: Experience count:', about.experience?.length || 0);
    console.log('📡 Backend: TechStack count:', about.techStack?.length || 0);

    res.status(200).json(
      successResponse('About content retrieved successfully', about)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update about content
 * @route   PUT /api/about
 * @access  Private
 */
const updateAbout = async (req, res, next) => {
  try {
    // Find existing about document or create new one
    let about = await About.findOne();

    // Ensure techStack is properly handled as an array
    if (req.body.techStack) {
      req.body.techStack = Array.isArray(req.body.techStack) 
        ? req.body.techStack.filter(t => t && typeof t === 'string' && t.trim().length > 0)
        : [];
      console.log('💾 Backend: Saving techStack:', req.body.techStack.length, 'technologies');
    }

    if (!about) {
      about = await About.create(req.body);
    } else {
      // Handle experience array FIRST - completely replace it
      if (req.body.experience !== undefined) {
        // Completely replace the experience array
        about.experience = Array.isArray(req.body.experience) ? req.body.experience : [];
        console.log('💾 Backend: Replacing experience array with:', about.experience.length, 'items');
        console.log('💾 Backend: Experience data:', JSON.stringify(about.experience, null, 2));
        // Mark as modified BEFORE Object.assign
        about.markModified('experience');
      }
      
      // Update other fields (but don't overwrite experience if we just set it)
      const updateData = { ...req.body };
      if (req.body.experience !== undefined) {
        delete updateData.experience; // Don't let Object.assign overwrite our explicit setting
      }
      Object.assign(about, updateData);
      
      // Explicitly set techStack to ensure it's saved
      if (req.body.techStack !== undefined) {
        about.techStack = Array.isArray(req.body.techStack) 
          ? req.body.techStack.filter(t => t && typeof t === 'string' && t.trim().length > 0)
          : [];
        about.markModified('techStack');
      }
      
      // Explicitly set badges if provided
      if (req.body.badges !== undefined) {
        about.badges = Array.isArray(req.body.badges) ? req.body.badges : [];
        about.markModified('badges');
      }
      
      // Save the document
      await about.save();
      
      // Verify what was actually saved
      const savedAbout = await About.findOne();
      console.log('✅ Backend: Document saved successfully');
      console.log('✅ Backend: Verified experience count in DB:', savedAbout.experience?.length || 0);
      console.log('✅ Backend: Verified techStack count in DB:', savedAbout.techStack?.length || 0);
    }

    console.log('✅ Backend: Saved techStack count:', about.techStack?.length || 0);
    console.log('✅ Backend: Saved experience count:', about.experience?.length || 0);

    res.status(200).json(
      successResponse('About content updated successfully', about)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add experience entry
 * @route   POST /api/about/experience
 * @access  Private
 */
const addExperience = async (req, res, next) => {
  try {
    const about = await About.findOne();
    
    if (!about) {
      return res.status(404).json(
        errorResponse('About document not found. Please create it first.')
      );
    }

    about.experience.push(req.body);
    await about.save();

    res.status(200).json(
      successResponse('Experience added successfully', about)
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add education entry
 * @route   POST /api/about/education
 * @access  Private
 */
const addEducation = async (req, res, next) => {
  try {
    const about = await About.findOne();
    
    if (!about) {
      return res.status(404).json(
        errorResponse('About document not found. Please create it first.')
      );
    }

    about.education.push(req.body);
    await about.save();

    res.status(200).json(
      successResponse('Education added successfully', about)
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAbout,
  updateAbout,
  addExperience,
  addEducation
};


