const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const User = require('../src/models/User');
const Project = require('../src/models/Project');

// Test data
const testUser = {
  name: 'Test Admin',
  email: 'admin@example.com',
  password: 'testpass123'
};

const testProject = {
  title: 'Test Project',
  description: 'This is a test project description',
  tech: ['React', 'Node.js', 'MongoDB'],
  liveUrl: 'https://example.com',
  repoUrl: 'https://github.com/test/project',
  images: ['https://example.com/image1.jpg']
};

// Set test environment
process.env.NODE_ENV = 'test';
process.env.ALLOW_REGISTER = 'true';

describe('Projects Endpoints', () => {
  let authToken;
  let projectId;

  beforeAll(async () => {
    // Connect to test database
    if (mongoose.connection.readyState === 0) {
      const mongoURI = process.env.TEST_MONGO_URI || process.env.MONGO_URI;
      await mongoose.connect(mongoURI);
    }

    // Clean up and create test user
    await User.deleteMany({ email: testUser.email });
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    authToken = res.body.data.token;
  });

  afterAll(async () => {
    // Clean up test data
    await User.deleteMany({ email: testUser.email });
    await Project.deleteMany({ title: testProject.title });
    
    // Close database connection
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clean up projects before each test
    await Project.deleteMany({ title: testProject.title });
  });

  describe('POST /api/projects', () => {
    it('should create a new project with valid auth', async () => {
      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testProject)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.title).toBe(testProject.title);
      expect(res.body.data.tech).toEqual(testProject.tech);

      projectId = res.body.data._id;
    });

    it('should not create project without auth', async () => {
      const res = await request(app)
        .post('/api/projects')
        .send(testProject)
        .expect(401);

      expect(res.body.success).toBe(false);
    });

    it('should not create project without required fields', async () => {
      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Only Title'
        })
        .expect(400);

      expect(res.body.success).toBe(false);
    });

    it('should not create project with invalid URL', async () => {
      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          ...testProject,
          liveUrl: 'not-a-valid-url'
        })
        .expect(400);

      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/projects', () => {
    beforeEach(async () => {
      // Create test projects
      await Project.create(testProject);
      await Project.create({
        ...testProject,
        title: 'Test Project 2',
        description: 'Second test project'
      });
    });

    it('should get all projects', async () => {
      const res = await request(app)
        .get('/api/projects')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.meta).toHaveProperty('total');
      expect(res.body.meta).toHaveProperty('page');
    });

    it('should support pagination', async () => {
      const res = await request(app)
        .get('/api/projects?page=1&limit=1')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.meta.limit).toBe(1);
      expect(res.body.meta.page).toBe(1);
    });

    it('should support search', async () => {
      const res = await request(app)
        .get('/api/projects?q=Test')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /api/projects/:id', () => {
    beforeEach(async () => {
      const project = await Project.create(testProject);
      projectId = project._id;
    });

    it('should get project by ID', async () => {
      const res = await request(app)
        .get(`/api/projects/${projectId}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBe(projectId.toString());
      expect(res.body.data.title).toBe(testProject.title);
    });

    it('should return 404 for non-existent project', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .get(`/api/projects/${fakeId}`)
        .expect(404);

      expect(res.body.success).toBe(false);
    });

    it('should return 400 for invalid ID format', async () => {
      const res = await request(app)
        .get('/api/projects/invalid-id')
        .expect(400);

      expect(res.body.success).toBe(false);
    });
  });

  describe('PUT /api/projects/:id', () => {
    beforeEach(async () => {
      const project = await Project.create(testProject);
      projectId = project._id;
    });

    it('should update project with valid auth', async () => {
      const updatedData = {
        title: 'Updated Project Title',
        description: 'Updated description'
      };

      const res = await request(app)
        .put(`/api/projects/${projectId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedData)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe(updatedData.title);
      expect(res.body.data.description).toBe(updatedData.description);
    });

    it('should not update project without auth', async () => {
      const res = await request(app)
        .put(`/api/projects/${projectId}`)
        .send({ title: 'Updated' })
        .expect(401);

      expect(res.body.success).toBe(false);
    });
  });

  describe('DELETE /api/projects/:id', () => {
    beforeEach(async () => {
      const project = await Project.create(testProject);
      projectId = project._id;
    });

    it('should delete project with valid auth', async () => {
      const res = await request(app)
        .delete(`/api/projects/${projectId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).toBe(true);

      // Verify project is deleted
      const project = await Project.findById(projectId);
      expect(project).toBeNull();
    });

    it('should not delete project without auth', async () => {
      const res = await request(app)
        .delete(`/api/projects/${projectId}`)
        .expect(401);

      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/projects/featured', () => {
    beforeEach(async () => {
      await Project.create({ ...testProject, featured: true });
      await Project.create({ 
        ...testProject, 
        title: 'Featured Project 2',
        featured: true 
      });
      await Project.create({ 
        ...testProject, 
        title: 'Regular Project',
        featured: false 
      });
    });

    it('should get only featured projects', async () => {
      const res = await request(app)
        .get('/api/projects/featured')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      
      // All returned projects should be featured
      res.body.data.forEach(project => {
        expect(project.featured).toBe(true);
      });
    });
  });
});

