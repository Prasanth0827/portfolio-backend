# Portfolio Backend API

A complete, production-ready Node.js + Express backend for a dynamic portfolio website with MongoDB Atlas integration. This API provides authentication, project management, skills tracking, contact form handling, and image upload functionality.

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- MongoDB Atlas account (or local MongoDB instance)
- Cloudinary account (optional, for image uploads)

### Installation

```bash
# Install dependencies
npm i
```

### Environment Setup

1. Copy `env.example` to `.env`:
```bash
cp env.example .env
```

2. Update `.env` with your values:
```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas connection string
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
CLIENT_ORIGIN=http://localhost:3000

# Registration (set to 'true' only for initial setup)
ALLOW_REGISTER=true
```

### Running the Application

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start

# Run tests
npm test

# Seed database with sample data
npm run seed
```

The server will start on `http://localhost:5000`

## 📋 Tech Stack

- **Runtime:** Node.js >= 18
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken)
- **Security:** bcryptjs, helmet, cors, express-rate-limit
- **Validation:** express-validator
- **File Upload:** multer + Cloudinary
- **Logging:** morgan
- **Testing:** Jest + Supertest
- **Development:** nodemon, dotenv

## 📁 Project Structure

```
portfolio-backend/
├── src/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   └── cloudinary.js         # Cloudinary configuration
│   ├── models/
│   │   ├── User.js               # Admin user model
│   │   ├── Project.js            # Project model
│   │   ├── About.js              # About section model
│   │   ├── Skill.js              # Skill model
│   │   └── ContactMessage.js     # Contact message model
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── aboutController.js
│   │   ├── skillController.js
│   │   ├── contactController.js
│   │   └── uploadController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── about.js
│   │   ├── skills.js
│   │   ├── contact.js
│   │   └── upload.js
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication
│   │   ├── errorHandler.js       # Global error handler
│   │   ├── validate.js           # Request validation
│   │   └── upload.js             # File upload configuration
│   ├── utils/
│   │   └── apiResponse.js        # Standardized API responses
│   └── server.js                 # Express app entry point
├── tests/
│   ├── auth.test.js              # Authentication tests
│   ├── projects.test.js          # Projects tests
│   └── setup.js                  # Test configuration
├── scripts/
│   └── seed.js                   # Database seeding script
├── postman/
│   └── PortfolioBackend.postman_collection.json
├── package.json
├── .gitignore
├── env.example
└── README.md
```

## 🔐 Authentication

### Register Admin (Only if ALLOW_REGISTER=true)

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Current User

```bash
GET /api/auth/me
Authorization: Bearer <token>
```

## 📚 API Endpoints

### Projects

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/projects` | Public | Get all projects (with pagination & search) |
| GET | `/api/projects/featured` | Public | Get featured projects |
| GET | `/api/projects/:id` | Public | Get single project |
| POST | `/api/projects` | Protected | Create new project |
| PUT | `/api/projects/:id` | Protected | Update project |
| DELETE | `/api/projects/:id` | Protected | Delete project |

**Query Parameters for GET /api/projects:**
- `page` (default: 1)
- `limit` (default: 10)
- `q` (search query)
- `status` (published/draft, default: published)

**Example: Create Project**
```bash
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "E-Commerce Platform",
  "description": "A full-stack e-commerce solution",
  "tech": ["React", "Node.js", "MongoDB", "Stripe"],
  "liveUrl": "https://example.com",
  "repoUrl": "https://github.com/username/project",
  "images": ["https://cloudinary.com/image1.jpg"],
  "featured": true,
  "status": "published"
}
```

### Skills

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/skills` | Public | Get all skills (grouped by category) |
| GET | `/api/skills/:id` | Public | Get single skill |
| POST | `/api/skills` | Protected | Create new skill |
| PUT | `/api/skills/:id` | Protected | Update skill |
| DELETE | `/api/skills/:id` | Protected | Delete skill |

**Example: Create Skill**
```bash
POST /api/skills
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "React",
  "category": "Frontend",
  "proficiency": 90,
  "icon": "react-icon-url"
}
```

**Categories:** Frontend, Backend, Database, DevOps, Tools, Other

### About

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/about` | Public | Get about content |
| PUT | `/api/about` | Protected | Update about content |
| POST | `/api/about/experience` | Protected | Add experience entry |
| POST | `/api/about/education` | Protected | Add education entry |

### Contact

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/contact` | Public | Submit contact message |
| GET | `/api/contact` | Protected | Get all messages |
| GET | `/api/contact/:id` | Protected | Get single message (marks as read) |
| PUT | `/api/contact/:id/read` | Protected | Mark message as read |
| DELETE | `/api/contact/:id` | Protected | Delete message |

**Example: Submit Contact Form**
```bash
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a potential project..."
}
```

### Upload

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/upload` | Protected | Upload single image |
| POST | `/api/upload/multiple` | Protected | Upload multiple images |

**Example: Upload Image**
```bash
POST /api/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

FormData: image=<file>
```

## 🧪 Testing

The project includes comprehensive tests using Jest and Supertest.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

**Test Coverage:**
- Authentication (register, login, get user)
- Projects CRUD operations
- Protected route access
- Validation errors
- Database operations

**Before running tests:**
1. Set `TEST_MONGO_URI` in your `.env` file
2. Ensure test database is separate from development database

```env
TEST_MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_test?retryWrites=true&w=majority
```

## 🌱 Database Seeding

Populate your database with sample data:

```bash
npm run seed
```

This will create:
- 1 Admin user (email: admin@example.com, password: admin123456)
- 5 Sample projects
- 24 Skills across different categories
- About section with experience and education

**⚠️ Warning:** The seed script will clear existing data. Comment out the delete operations in `scripts/seed.js` if you want to preserve existing data.

## 🌐 Connect with Vite React Frontend

### Setup Axios in React

```bash
npm install axios
```

### Create API Service (`src/services/api.js`)

```javascript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Example: Fetch Projects

```javascript
import api from './services/api';

// Get all projects
const fetchProjects = async () => {
  try {
    const response = await api.get('/projects');
    console.log(response.data.data); // Array of projects
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

// Get projects with pagination
const fetchProjectsPaginated = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/projects?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Example: Login and Store Token

```javascript
import api from './services/api';

const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password
    });
    
    const { token, user } = response.data.data;
    
    // Store token in localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { success: true, user };
  } catch (error) {
    console.error('Login failed:', error.response?.data?.error);
    return { success: false, error: error.response?.data?.error };
  }
};
```

### Example: Create Project (Protected)

```javascript
import api from './services/api';

const createProject = async (projectData) => {
  try {
    const response = await api.post('/projects', projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error.response?.data);
    throw error;
  }
};

// Usage
const newProject = {
  title: 'My Project',
  description: 'Project description',
  tech: ['React', 'Node.js'],
  liveUrl: 'https://example.com',
  repoUrl: 'https://github.com/user/repo',
  images: []
};

createProject(newProject);
```

### Environment Variables in Vite (`.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

## 🚢 Deployment

### Deploy to Render

1. **Create MongoDB Atlas Cluster:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Add your connection string to environment variables

2. **Create Render Account:**
   - Go to [Render.com](https://render.com)
   - Create a new Web Service
   - Connect your GitHub repository

3. **Configure Render:**
   
   **Build Command:**
   ```bash
   npm install
   ```
   
   **Start Command:**
   ```bash
   npm start
   ```

4. **Set Environment Variables in Render:**
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_very_secure_secret_key
   JWT_EXPIRES_IN=7d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   CLIENT_ORIGIN=https://your-frontend-domain.com
   ALLOW_REGISTER=false
   ```

5. **Deploy:**
   - Render will automatically deploy on push to main branch
   - Access your API at: `https://your-app.onrender.com`

### Deploy to Heroku

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create new app
heroku create your-portfolio-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI="your_mongodb_uri"
heroku config:set JWT_SECRET="your_secret"
heroku config:set CLOUDINARY_CLOUD_NAME="your_cloud_name"
heroku config:set CLOUDINARY_API_KEY="your_api_key"
heroku config:set CLOUDINARY_API_SECRET="your_api_secret"
heroku config:set CLIENT_ORIGIN="https://your-frontend.com"
heroku config:set ALLOW_REGISTER=false

# Deploy
git push heroku main

# Open app
heroku open
```

### Environment Variables Checklist for Production

- ✅ Set `NODE_ENV=production`
- ✅ Use strong `JWT_SECRET` (generate with: `openssl rand -base64 32`)
- ✅ Set correct `MONGO_URI` (MongoDB Atlas)
- ✅ Configure `CLIENT_ORIGIN` (your frontend URL)
- ✅ Set `ALLOW_REGISTER=false` (after creating admin)
- ✅ Add Cloudinary credentials (if using image uploads)

## 🔄 CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Render

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
        env:
          TEST_MONGO_URI: ${{ secrets.TEST_MONGO_URI }}
          JWT_SECRET: ${{ secrets.JWT_SECRET }}

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Render
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

**Setup:**
1. Add secrets in GitHub repository settings
2. Get deploy hook URL from Render dashboard
3. Tests run automatically on push, then deploys if tests pass

## 📦 Postman Collection

Import the Postman collection from `postman/PortfolioBackend.postman_collection.json`

**Features:**
- Pre-configured requests for all endpoints
- Auto-saves JWT token after login
- Environment variables (baseUrl, authToken)
- Example requests with sample data

**Usage:**
1. Import collection into Postman
2. Set `baseUrl` variable (default: http://localhost:5000)
3. Run "Login" request to get token
4. Token is automatically used for protected routes

## 🔒 Security Features

- **JWT Authentication:** Secure token-based authentication
- **Password Hashing:** bcryptjs with salt rounds
- **Helmet:** Security headers
- **CORS:** Configurable cross-origin requests
- **Rate Limiting:** Prevents brute force attacks
- **Input Validation:** express-validator on all inputs
- **MongoDB Injection Protection:** Mongoose sanitization

### Rate Limiting

- **General API:** 100 requests per 15 minutes per IP
- **Auth Routes:** 5 login attempts per 15 minutes per IP

To customize, edit `src/server.js`:

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
```

## 🐛 Error Handling

All errors return consistent JSON format:

```json
{
  "success": false,
  "error": "Error message here",
  "details": {
    "additionalInfo": "..."
  }
}
```

**Common Error Codes:**
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (registration disabled, etc.)
- `404` - Not Found
- `500` - Internal Server Error

## 📝 API Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "meta": {
    "total": 100,
    "page": 1,
    "pages": 10,
    "limit": 10
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "details": { ... }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name - [Your Email](mailto:your.email@example.com)

## 🙏 Acknowledgments

- Express.js team
- MongoDB team
- All contributors and open source libraries used

---

**Need Help?**
- 📧 Email: support@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/portfolio-backend/issues)
- 📖 Docs: [API Documentation](https://your-api.com/docs)

**Happy Coding! 🚀**

