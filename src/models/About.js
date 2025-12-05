const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    default: 'About Me'
  },
  showProjectIntro: {
    type: Boolean,
    default: true
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    maxlength: [5000, 'Bio cannot exceed 5000 characters']
  },
  shortBio: {
    type: String,
    maxlength: [500, 'Short bio cannot exceed 500 characters']
  },
  profileImage: {
    type: String,
    trim: true
  },
  logo: {
    type: String,
    trim: true
  },
  resumeUrl: {
    type: String,
    trim: true
  },
  resume: {
    fileName: String,
    fileData: String  // Base64 encoded PDF
  },
  aboutHome1: {
    type: String,
    maxlength: [1000, 'About home section 1 cannot exceed 1000 characters']
  },
  aboutHome2: {
    type: String,
    maxlength: [1000, 'About home section 2 cannot exceed 1000 characters']
  },
  aboutHome3: {
    type: String,
    maxlength: [1000, 'About home section 3 cannot exceed 1000 characters']
  },
  techStack: [{
    type: String
  }],
  badges: [{
    type: String,
    trim: true
  }],
  experience: [{
    company: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    },
    order: {
      type: Number,
      default: 0
    }
  }],
  education: [{
    institution: {
      type: String,
      required: true
    },
    degree: {
      type: String,
      required: true
    },
    field: {
      type: String
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    description: {
      type: String
    },
    order: {
      type: Number,
      default: 0
    }
  }],
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    email: String,
    website: String
  },
  contact: {
    email: String,
    phone: String,
    location: String
  },
  experienceStats: {
    projectsCompleted: String,
    clientsSatisfied: String,
    yearsExperience: String
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('About', aboutSchema);

