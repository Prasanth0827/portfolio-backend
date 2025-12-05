# 🚀 Quick Setup Guide

## Step 1: Create .env File

Since `.env` files are gitignored (for security), you need to create it manually.

### Option A: Use the script (Recommended)
```bash
node create-env.js
```

### Option B: Manual creation
```bash
# Copy the example file
cp env.example .env

# Or on Windows:
copy env.example .env
```

### Option C: Create manually
Create a file named `.env` in the `portfolio-backend` folder with this content:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# Test Database
TEST_MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_test?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Cloudinary Configuration (optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS Configuration
CLIENT_ORIGIN=http://localhost:3000

# Admin Registration
ALLOW_REGISTER=true
```

## Step 2: Update .env with Your Values

1. **MongoDB Atlas:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string
   - Replace `MONGO_URI` in `.env`

2. **JWT Secret:**
   - Generate a strong secret:
     ```bash
     openssl rand -base64 32
     ```
   - Replace `JWT_SECRET` in `.env`

3. **Cloudinary (Optional):**
   - Go to [Cloudinary](https://cloudinary.com)
   - Get your credentials
   - Add to `.env`

4. **Frontend URL:**
   - Update `CLIENT_ORIGIN` with your frontend URL

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Seed Database (Optional)

```bash
npm run seed
```

This creates:
- Admin user (email: admin@example.com, password: admin123456)
- 5 sample projects
- 24 skills
- About section

## Step 5: Start Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Step 6: Test API

Visit: `http://localhost:5000/health`

Or test with Postman:
- Import `postman/PortfolioBackend.postman_collection.json`
- Set `baseUrl` to `http://localhost:5000`
- Run "Login" request

## ✅ You're Ready!

Your backend is now running! Check the main [README.md](./README.md) for more details.

