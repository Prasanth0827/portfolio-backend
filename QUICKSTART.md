# ⚡ Quick Start Guide

Get your Portfolio Backend API up and running in 5 minutes!

## 🎯 Step 1: Prerequisites Check

Ensure you have:
- ✅ Node.js >= 18.0.0 installed
- ✅ MongoDB Atlas account (free tier works!)
- ✅ Git installed

```bash
# Check Node.js version
node --version  # Should be >= 18.0.0

# Check npm version
npm --version
```

## 📦 Step 2: Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio-backend

# Install dependencies
npm install
```

## 🔧 Step 3: Environment Setup

### Create MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login → Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy your connection string

### Configure Environment

```bash
# Copy example env file
cp env.example .env

# Edit .env file with your values
```

**Minimal .env configuration:**

```env
PORT=5000
NODE_ENV=development

# Replace with your MongoDB Atlas connection string
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# Generate a random JWT secret (or use this command: openssl rand -base64 32)
JWT_SECRET=your_super_secret_jwt_key_here

# Allow registration for first-time setup
ALLOW_REGISTER=true

# Your frontend URL
CLIENT_ORIGIN=http://localhost:3000
```

## 🌱 Step 4: Seed Database (Optional but Recommended)

Populate your database with sample data:

```bash
npm run seed
```

This creates:
- ✅ Admin user (email: `admin@example.com`, password: `admin123456`)
- ✅ 5 sample projects
- ✅ 24 skills across different categories
- ✅ About section with experience and education

## 🚀 Step 5: Start the Server

```bash
# Development mode (with auto-reload)
npm run dev
```

You should see:

```
✅ Connected to MongoDB
🚀 Portfolio Backend Server Running
   Environment: development
   Port: 5000
   URL: http://localhost:5000
```

## ✅ Step 6: Test Your API

### Option A: Using Browser

Visit: `http://localhost:5000/health`

You should see:
```json
{
  "success": true,
  "message": "Server is running",
  "environment": "development"
}
```

### Option B: Using curl

```bash
# Health check
curl http://localhost:5000/health

# Get all projects
curl http://localhost:5000/api/projects

# Login (if you ran seed script)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123456"}'
```

### Option C: Using Postman

1. Import `postman/PortfolioBackend.postman_collection.json`
2. Set `baseUrl` to `http://localhost:5000`
3. Run the "Login" request
4. Token is automatically saved for protected routes!

## 🎨 Step 7: Connect Your Frontend

### Install Axios in your React app

```bash
cd your-react-app
npm install axios
```

### Create API service (`src/services/api.js`)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auto-attach token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Fetch projects in your React component

```javascript
import { useState, useEffect } from 'react';
import api from './services/api';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {projects.map(project => (
        <div key={project._id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Projects;
```

## 🧪 Step 8: Run Tests (Optional)

```bash
npm test
```

## 📝 Common Commands

```bash
# Development
npm run dev          # Start with auto-reload

# Production
npm start            # Start server

# Database
npm run seed         # Seed database with sample data

# Testing
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode

# Code Quality
npm run lint         # Run ESLint
```

## 🎯 What's Next?

### For Development:

1. **Customize Models:** Edit files in `src/models/`
2. **Add Endpoints:** Create controllers in `src/controllers/` and routes in `src/routes/`
3. **Update Seed Data:** Modify `scripts/seed.js` with your content
4. **Configure Cloudinary:** Add credentials to `.env` for image uploads
5. **Write Tests:** Add tests in `tests/` directory

### For Production:

1. **Change Admin Password:** Login and update via `/api/auth/me`
2. **Disable Registration:** Set `ALLOW_REGISTER=false` in `.env`
3. **Generate Secure JWT Secret:** `openssl rand -base64 32`
4. **Deploy:** Follow deployment guide in [README.md](./README.md)

## 🔥 Quick Troubleshoots

### MongoDB Connection Error

```
❌ Error: MongoServerError: bad auth
```

**Solution:** Check your MongoDB Atlas credentials and IP whitelist:
1. Go to MongoDB Atlas → Database Access → Verify credentials
2. Network Access → Add your IP address (or use 0.0.0.0/0 for all IPs)

### Port Already in Use

```
❌ Error: EADDRINUSE: address already in use :::5000
```

**Solution:** Change port in `.env` or kill existing process:

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

### CORS Error in Frontend

```
❌ Access to XMLHttpRequest blocked by CORS policy
```

**Solution:** Update `CLIENT_ORIGIN` in `.env`:

```env
CLIENT_ORIGIN=http://localhost:3000
```

### JWT Token Issues

```
❌ Error: Not authorized to access this route
```

**Solution:** 
1. Ensure token is saved: `localStorage.getItem('authToken')`
2. Check token format: `Bearer <token>`
3. Verify token hasn't expired (default: 7 days)

## 📚 Additional Resources

- 📖 [Full Documentation](./README.md)
- 🔗 [API Reference](./API_REFERENCE.md)
- 📮 [Postman Collection](./postman/PortfolioBackend.postman_collection.json)
- 🤝 [Contributing Guide](./CONTRIBUTING.md)

## 💡 Pro Tips

1. **Use Environment Variables:** Never commit `.env` file
2. **Test API with Postman:** Import collection for quick testing
3. **Check Logs:** Server logs show all requests and errors
4. **Use Seed Script:** Great for development and testing
5. **Read Error Messages:** They're designed to be helpful!

## 🆘 Need Help?

- Check [README.md](./README.md) for detailed docs
- Review [API_REFERENCE.md](./API_REFERENCE.md) for endpoint details
- Open an issue on GitHub
- Check MongoDB Atlas status page

---

**🎉 Congratulations!** Your Portfolio Backend API is now running!

Start building your amazing portfolio! 🚀

