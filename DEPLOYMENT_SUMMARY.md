# 🚀 Deployment & Production Checklist

Complete guide to deploying your Portfolio Backend API to production.

## ✅ Pre-Deployment Checklist

### 1. Environment Variables

Ensure all required environment variables are set:

```env
✅ NODE_ENV=production
✅ PORT=5000
✅ MONGO_URI=<your_mongodb_atlas_uri>
✅ JWT_SECRET=<strong_random_secret>
✅ JWT_EXPIRES_IN=7d
✅ CLOUDINARY_CLOUD_NAME=<your_cloud_name>
✅ CLOUDINARY_API_KEY=<your_api_key>
✅ CLOUDINARY_API_SECRET=<your_api_secret>
✅ CLIENT_ORIGIN=<your_frontend_url>
✅ ALLOW_REGISTER=false
```

### 2. Security Checks

- ✅ JWT_SECRET is strong (use: `openssl rand -base64 32`)
- ✅ ALLOW_REGISTER is set to `false` in production
- ✅ MongoDB Atlas IP whitelist configured
- ✅ Database user has proper permissions
- ✅ CORS CLIENT_ORIGIN matches your frontend
- ✅ All secrets are stored securely (not in code)

### 3. Database Setup

- ✅ MongoDB Atlas cluster is created
- ✅ Database user is created with read/write permissions
- ✅ Network access allows your deployment platform IP
- ✅ Connection string is tested and working
- ✅ Database has been seeded (run `npm run seed`)

### 4. Code Quality

- ✅ All tests pass (`npm test`)
- ✅ No linting errors (`npm run lint`)
- ✅ Dependencies are up to date
- ✅ `.gitignore` is properly configured
- ✅ No sensitive data in repository

---

## 🌐 Platform-Specific Deployment

### Option 1: Render (Recommended)

#### Why Render?
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Easy deployment from GitHub
- ✅ Built-in health checks
- ✅ Automatic restarts

#### Steps:

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   ```
   Name: portfolio-backend
   Environment: Node
   Branch: main
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   - Go to "Environment" tab
   - Add all variables from checklist above
   - Click "Save Changes"

5. **Deploy**
   - Click "Create Web Service"
   - Wait for build to complete (3-5 minutes)
   - Your API will be live at: `https://your-app.onrender.com`

6. **Set Up Auto-Deploy**
   - Go to "Settings" → "Build & Deploy"
   - Enable "Auto-Deploy"
   - Now pushes to main branch auto-deploy

#### Render Health Check

Render automatically uses: `GET /health`

Your API already has this endpoint configured!

---

### Option 2: Heroku

#### Steps:

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku

   # Windows
   # Download from: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   heroku create your-portfolio-api
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGO_URI="your_mongodb_uri"
   heroku config:set JWT_SECRET="your_secret"
   heroku config:set CLIENT_ORIGIN="https://your-frontend.com"
   heroku config:set CLOUDINARY_CLOUD_NAME="your_cloud"
   heroku config:set CLOUDINARY_API_KEY="your_key"
   heroku config:set CLOUDINARY_API_SECRET="your_secret"
   heroku config:set ALLOW_REGISTER=false
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **Open App**
   ```bash
   heroku open
   ```

7. **View Logs**
   ```bash
   heroku logs --tail
   ```

---

### Option 3: Railway

1. **Create Account**: [railway.app](https://railway.app)
2. **New Project**: "Deploy from GitHub repo"
3. **Add Variables**: Same as Render
4. **Deploy**: Automatic on push to main

---

### Option 4: DigitalOcean App Platform

1. **Create Account**: [digitalocean.com](https://digitalocean.com)
2. **Create App**: Connect GitHub repository
3. **Configure**:
   ```
   Name: portfolio-backend
   Branch: main
   Build Command: npm ci
   Run Command: npm start
   ```
4. **Add Environment Variables**
5. **Deploy**

---

### Option 5: AWS EC2 (Advanced)

#### Prerequisites:
- AWS account
- Basic Linux knowledge
- SSH access

#### Steps:

1. **Launch EC2 Instance**
   - Ubuntu Server 22.04 LTS
   - t2.micro (free tier)
   - Configure security group (ports 22, 80, 443, 5000)

2. **Connect via SSH**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

4. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/portfolio-backend.git
   cd portfolio-backend
   npm install
   ```

5. **Set Environment Variables**
   ```bash
   nano .env
   # Add all your environment variables
   ```

6. **Start with PM2**
   ```bash
   pm2 start src/server.js --name portfolio-api
   pm2 startup
   pm2 save
   ```

7. **Setup Nginx (Optional)**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/default
   ```

   Add:
   ```nginx
   location /api {
       proxy_pass http://localhost:5000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
   }
   ```

   ```bash
   sudo systemctl restart nginx
   ```

---

### Option 6: Docker Deployment

#### Prerequisites:
- Docker installed
- DockerHub account (optional)

#### Build and Run Locally:

```bash
# Build image
docker build -t portfolio-backend .

# Run container
docker run -p 5000:5000 \
  -e MONGO_URI="your_uri" \
  -e JWT_SECRET="your_secret" \
  -e NODE_ENV=production \
  portfolio-backend
```

#### Docker Compose:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Deploy to Cloud:

1. **Push to DockerHub**
   ```bash
   docker tag portfolio-backend username/portfolio-backend
   docker push username/portfolio-backend
   ```

2. **Pull on Server**
   ```bash
   docker pull username/portfolio-backend
   docker run -d -p 5000:5000 username/portfolio-backend
   ```

---

## 🔄 CI/CD Setup

### GitHub Actions (Already Configured!)

Your project includes two workflows:

1. **`.github/workflows/test.yml`**
   - Runs on every push/PR
   - Tests on Node 18 & 20
   - Runs linter and tests

2. **`.github/workflows/deploy.yml`**
   - Runs on push to main
   - Tests first, then deploys
   - Triggers Render/Heroku deployment

#### Setup:

1. **Add Secrets to GitHub**
   - Go to: Settings → Secrets → Actions
   - Add:
     - `TEST_MONGO_URI`: Test database URI
     - `JWT_SECRET`: Your JWT secret
     - `RENDER_DEPLOY_HOOK`: Render deploy webhook URL

2. **Get Render Deploy Hook**
   - Render Dashboard → Settings → Deploy Hook
   - Copy the webhook URL

3. **Push to GitHub**
   ```bash
   git push origin main
   ```

4. **Watch Action Run**
   - Go to Actions tab on GitHub
   - See tests run and deployment trigger

---

## 🧪 Post-Deployment Testing

### 1. Health Check

```bash
curl https://your-app.com/health
```

Expected:
```json
{
  "success": true,
  "message": "Server is running",
  "environment": "production"
}
```

### 2. Get Projects (Public)

```bash
curl https://your-app.com/api/projects
```

### 3. Login

```bash
curl -X POST https://your-app.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123456"}'
```

### 4. Test Protected Route

```bash
curl https://your-app.com/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 5. Update Postman

- Update `baseUrl` to production URL
- Test all endpoints
- Verify CORS works with frontend

---

## 📊 Monitoring & Maintenance

### Application Monitoring

1. **Render Dashboard**
   - View logs in real-time
   - Monitor CPU/Memory usage
   - Check request metrics

2. **MongoDB Atlas**
   - Monitor database connections
   - Check query performance
   - Set up alerts

3. **Error Tracking** (Optional)
   - [Sentry](https://sentry.io): Error monitoring
   - [LogRocket](https://logrocket.com): Session replay
   - [Datadog](https://datadoghq.com): Full-stack monitoring

### Uptime Monitoring

Free services:
- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://pingdom.com)
- [StatusCake](https://statuscake.com)

Setup:
1. Create account
2. Add your API URL
3. Set check interval (5 minutes)
4. Configure email alerts

---

## 🔧 Troubleshooting

### App Won't Start

```bash
# Check logs
# Render: Dashboard → Logs
# Heroku: heroku logs --tail

# Common issues:
- Missing environment variables
- Wrong Node version
- MongoDB connection failed
- Port already in use
```

### MongoDB Connection Failed

```bash
# Check:
1. MongoDB Atlas IP whitelist (add 0.0.0.0/0 for all IPs)
2. Database user permissions
3. Connection string format
4. Network access rules
```

### CORS Errors

```bash
# Ensure CLIENT_ORIGIN matches frontend URL
CLIENT_ORIGIN=https://your-frontend.com

# Not:
CLIENT_ORIGIN=https://your-frontend.com/  # No trailing slash
```

### 502 Bad Gateway

```bash
# Server is down or not responding
# Check:
1. Server logs for errors
2. MongoDB connection
3. Port configuration
4. Health check endpoint
```

---

## 🔐 Security Hardening

### Production Security Checklist

- ✅ Strong JWT secret (32+ characters)
- ✅ HTTPS enabled (automatic on Render/Heroku)
- ✅ Rate limiting enabled (already configured)
- ✅ Helmet security headers (already configured)
- ✅ CORS properly configured
- ✅ No sensitive data in logs
- ✅ Environment variables secure
- ✅ MongoDB Atlas firewall configured
- ✅ Regular dependency updates
- ✅ Error messages don't expose internals

### Additional Security (Optional)

1. **Add API Key Authentication**
2. **Enable 2FA for Database**
3. **Set up WAF (Web Application Firewall)**
4. **Regular security audits**: `npm audit`
5. **Dependency scanning**: Dependabot/Snyk

---

## 📈 Performance Optimization

### Database Indexing

Already configured:
- Text search on projects
- Timestamp indexes
- Category indexes

### Caching (Optional)

Add Redis for caching:
```bash
npm install redis
```

### CDN (Optional)

Use Cloudflare for:
- DDoS protection
- CDN caching
- SSL
- Analytics

---

## 🎯 Next Steps After Deployment

1. **Change Admin Password**
   ```bash
   # Login → Update profile
   PUT /api/auth/me
   ```

2. **Disable Registration**
   ```env
   ALLOW_REGISTER=false
   ```

3. **Add Real Content**
   - Update projects
   - Add your skills
   - Complete about section

4. **Connect Frontend**
   - Update frontend API URL
   - Test all features
   - Deploy frontend

5. **Set Up Monitoring**
   - Add uptime monitoring
   - Configure error tracking
   - Set up alerts

6. **Document Your API**
   - Share Postman collection
   - Update README with production URL
   - Add API documentation link

---

## 📞 Support

If you encounter issues:

1. **Check Logs**: First place to look
2. **Review Docs**: README.md, API_REFERENCE.md
3. **Test Locally**: Reproduce issue locally
4. **Check GitHub Issues**: See if others had same issue
5. **Platform Support**: Render/Heroku support docs

---

## 🎉 Congratulations!

Your Portfolio Backend API is now:
- ✅ Deployed to production
- ✅ Secured with best practices
- ✅ Monitored and maintained
- ✅ Ready to serve your frontend
- ✅ Scalable and reliable

**Your API is live at:** `https://your-app.onrender.com`

Now go build an amazing frontend! 🚀

