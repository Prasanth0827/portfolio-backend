require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Project = require('../src/models/Project');
const Skill = require('../src/models/Skill');
const About = require('../src/models/About');

// Sample data
const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123456',
  role: 'admin'
};

const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with shopping cart, payment integration, and admin dashboard. Built with modern technologies and best practices.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    liveUrl: 'https://example-ecommerce.com',
    repoUrl: 'https://github.com/username/ecommerce-platform',
    images: ['https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=E-Commerce'],
    featured: true,
    order: 1,
    status: 'published'
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, team collaboration features, and intuitive UI.',
    tech: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    liveUrl: 'https://example-tasks.com',
    repoUrl: 'https://github.com/username/task-manager',
    images: ['https://via.placeholder.com/800x600/10B981/FFFFFF?text=Task+Manager'],
    featured: true,
    order: 2,
    status: 'published'
  },
  {
    title: 'Weather Dashboard',
    description: 'Real-time weather dashboard with forecasts, interactive maps, and weather alerts. Clean and responsive design.',
    tech: ['Vue.js', 'OpenWeather API', 'Chart.js', 'CSS3'],
    liveUrl: 'https://example-weather.com',
    repoUrl: 'https://github.com/username/weather-dashboard',
    images: ['https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=Weather+Dashboard'],
    featured: false,
    order: 3,
    status: 'published'
  },
  {
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media management with data visualization and reporting features.',
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'D3.js'],
    liveUrl: 'https://example-social.com',
    repoUrl: 'https://github.com/username/social-dashboard',
    images: ['https://via.placeholder.com/800x600/8B5CF6/FFFFFF?text=Social+Dashboard'],
    featured: true,
    order: 4,
    status: 'published'
  },
  {
    title: 'Blog Platform',
    description: 'A modern blogging platform with markdown support, tags, categories, and comment system.',
    tech: ['React', 'Node.js', 'MongoDB', 'AWS S3'],
    liveUrl: 'https://example-blog.com',
    repoUrl: 'https://github.com/username/blog-platform',
    images: ['https://via.placeholder.com/800x600/EC4899/FFFFFF?text=Blog+Platform'],
    featured: false,
    order: 5,
    status: 'published'
  }
];

const sampleSkills = [
  // Frontend
  { name: 'React', category: 'Frontend', proficiency: 90, order: 1 },
  { name: 'Vue.js', category: 'Frontend', proficiency: 85, order: 2 },
  { name: 'TypeScript', category: 'Frontend', proficiency: 88, order: 3 },
  { name: 'Next.js', category: 'Frontend', proficiency: 87, order: 4 },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 92, order: 5 },
  { name: 'HTML5/CSS3', category: 'Frontend', proficiency: 95, order: 6 },
  
  // Backend
  { name: 'Node.js', category: 'Backend', proficiency: 90, order: 1 },
  { name: 'Express', category: 'Backend', proficiency: 92, order: 2 },
  { name: 'Python', category: 'Backend', proficiency: 80, order: 3 },
  { name: 'Django', category: 'Backend', proficiency: 75, order: 4 },
  { name: 'REST APIs', category: 'Backend', proficiency: 93, order: 5 },
  { name: 'GraphQL', category: 'Backend', proficiency: 78, order: 6 },
  
  // Database
  { name: 'MongoDB', category: 'Database', proficiency: 88, order: 1 },
  { name: 'PostgreSQL', category: 'Database', proficiency: 85, order: 2 },
  { name: 'MySQL', category: 'Database', proficiency: 82, order: 3 },
  { name: 'Redis', category: 'Database', proficiency: 75, order: 4 },
  
  // DevOps
  { name: 'Docker', category: 'DevOps', proficiency: 80, order: 1 },
  { name: 'AWS', category: 'DevOps', proficiency: 78, order: 2 },
  { name: 'CI/CD', category: 'DevOps', proficiency: 82, order: 3 },
  { name: 'Nginx', category: 'DevOps', proficiency: 75, order: 4 },
  
  // Tools
  { name: 'Git', category: 'Tools', proficiency: 95, order: 1 },
  { name: 'VS Code', category: 'Tools', proficiency: 98, order: 2 },
  { name: 'Postman', category: 'Tools', proficiency: 90, order: 3 },
  { name: 'Figma', category: 'Tools', proficiency: 80, order: 4 }
];

const aboutData = {
  title: 'About Me',
  bio: `I'm a passionate full-stack developer with expertise in building modern web applications. 
  With several years of experience in the industry, I specialize in JavaScript technologies and have a strong 
  foundation in both frontend and backend development. I love creating elegant solutions to complex problems 
  and am constantly learning new technologies to stay current in this ever-evolving field.`,
  shortBio: 'Full-stack developer passionate about creating elegant and efficient web applications.',
  experience: [
    {
      company: 'Tech Solutions Inc.',
      position: 'Senior Full-Stack Developer',
      startDate: new Date('2021-01-01'),
      current: true,
      description: 'Lead development of enterprise web applications using React, Node.js, and cloud technologies.'
    },
    {
      company: 'Digital Agency XYZ',
      position: 'Full-Stack Developer',
      startDate: new Date('2019-06-01'),
      endDate: new Date('2020-12-31'),
      current: false,
      description: 'Developed and maintained multiple client websites and web applications.'
    },
    {
      company: 'StartUp ABC',
      position: 'Junior Developer',
      startDate: new Date('2018-03-01'),
      endDate: new Date('2019-05-31'),
      current: false,
      description: 'Assisted in building MVP products and learned modern web development practices.'
    }
  ],
  education: [
    {
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: new Date('2014-09-01'),
      endDate: new Date('2018-06-01'),
      description: 'Focused on software engineering, algorithms, and web development.'
    }
  ],
  socialLinks: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    email: 'hello@yourwebsite.com',
    website: 'https://yourwebsite.com'
  }
};

// Connect to database and seed data
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Connect to MongoDB
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data (optional - comment out to preserve existing data)
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await About.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Seed Admin User
    console.log('👤 Creating admin user...');
    const user = await User.create(adminUser);
    console.log(`✅ Admin user created: ${user.email}`);
    console.log(`   Password: ${adminUser.password} (change this after first login!)\n`);

    // Seed Projects
    console.log('📁 Creating projects...');
    const projects = await Project.insertMany(sampleProjects);
    console.log(`✅ Created ${projects.length} projects\n`);

    // Seed Skills
    console.log('🎯 Creating skills...');
    const skills = await Skill.insertMany(sampleSkills);
    console.log(`✅ Created ${skills.length} skills\n`);

    // Seed About
    console.log('ℹ️  Creating about section...');
    const about = await About.create(aboutData);
    console.log(`✅ About section created\n`);

    console.log('═══════════════════════════════════════════');
    console.log('🎉 Database seeding completed successfully!');
    console.log('═══════════════════════════════════════════');
    console.log('\n📋 Summary:');
    console.log(`   - Admin users: 1`);
    console.log(`   - Projects: ${projects.length}`);
    console.log(`   - Skills: ${skills.length}`);
    console.log(`   - About section: 1`);
    console.log('\n🔐 Admin Credentials:');
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Password: ${adminUser.password}`);
    console.log('\n⚠️  Remember to change the admin password after first login!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run seeding
seedDatabase();

