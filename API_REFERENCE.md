# API Reference

Complete API endpoint reference for Portfolio Backend.

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-app.onrender.com/api
```

## Authentication

All protected endpoints require JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Register Admin

**POST** `/auth/register`

**Auth Required:** No (only works if `ALLOW_REGISTER=true`)

**Request Body:**
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "admin"
    },
    "token": "jwt_token_here"
  }
}
```

---

### Login

**POST** `/auth/login`

**Auth Required:** No

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "admin"
    },
    "token": "jwt_token_here"
  }
}
```

---

### Get Current User

**GET** `/auth/me`

**Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "message": "User profile retrieved",
  "data": {
    "user": {
      "id": "user_id",
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "admin",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

## 📁 Projects Endpoints

### Get All Projects

**GET** `/projects`

**Auth Required:** No

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `q` (string) - Search query
- `status` (string: published|draft, default: published)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Projects retrieved successfully",
  "data": [
    {
      "_id": "project_id",
      "title": "E-Commerce Platform",
      "description": "Full description...",
      "tech": ["React", "Node.js", "MongoDB"],
      "liveUrl": "https://example.com",
      "repoUrl": "https://github.com/user/repo",
      "images": ["https://image-url.jpg"],
      "featured": true,
      "order": 1,
      "status": "published",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "pages": 5,
    "limit": 10
  }
}
```

---

### Get Featured Projects

**GET** `/projects/featured`

**Auth Required:** No

**Success Response (200):**
```json
{
  "success": true,
  "message": "Featured projects retrieved successfully",
  "data": [...]
}
```

---

### Get Single Project

**GET** `/projects/:id`

**Auth Required:** No

**URL Parameters:**
- `id` - Project ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Project retrieved successfully",
  "data": {
    "_id": "project_id",
    "title": "Project Title",
    "description": "Description...",
    ...
  }
}
```

---

### Create Project

**POST** `/projects`

**Auth Required:** Yes

**Request Body:**
```json
{
  "title": "My Awesome Project",
  "description": "Detailed description of the project",
  "tech": ["React", "Node.js", "MongoDB"],
  "liveUrl": "https://example.com",
  "repoUrl": "https://github.com/user/repo",
  "images": ["https://image-url.jpg"],
  "featured": true,
  "status": "published"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": { ... }
}
```

---

### Update Project

**PUT** `/projects/:id`

**Auth Required:** Yes

**URL Parameters:**
- `id` - Project ID

**Request Body:** (any fields to update)
```json
{
  "title": "Updated Title",
  "featured": true
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Project updated successfully",
  "data": { ... }
}
```

---

### Delete Project

**DELETE** `/projects/:id`

**Auth Required:** Yes

**URL Parameters:**
- `id` - Project ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Project deleted successfully",
  "data": {
    "id": "project_id"
  }
}
```

---

## 🎯 Skills Endpoints

### Get All Skills

**GET** `/skills`

**Auth Required:** No

**Query Parameters:**
- `category` (string) - Filter by category (Frontend, Backend, Database, DevOps, Tools, Other)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Skills retrieved successfully",
  "data": {
    "Frontend": [
      {
        "_id": "skill_id",
        "name": "React",
        "category": "Frontend",
        "proficiency": 90,
        "icon": "icon-url",
        "order": 1
      }
    ],
    "Backend": [...],
    ...
  }
}
```

---

### Create Skill

**POST** `/skills`

**Auth Required:** Yes

**Request Body:**
```json
{
  "name": "React",
  "category": "Frontend",
  "proficiency": 90,
  "icon": "icon-url",
  "order": 1
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Skill created successfully",
  "data": { ... }
}
```

---

### Update Skill

**PUT** `/skills/:id`

**Auth Required:** Yes

**URL Parameters:**
- `id` - Skill ID

**Request Body:** (any fields to update)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Skill updated successfully",
  "data": { ... }
}
```

---

### Delete Skill

**DELETE** `/skills/:id`

**Auth Required:** Yes

**URL Parameters:**
- `id` - Skill ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Skill deleted successfully",
  "data": { "id": "skill_id" }
}
```

---

## ℹ️ About Endpoints

### Get About

**GET** `/about`

**Auth Required:** No

**Success Response (200):**
```json
{
  "success": true,
  "message": "About content retrieved successfully",
  "data": {
    "_id": "about_id",
    "title": "About Me",
    "bio": "Full bio...",
    "shortBio": "Short bio...",
    "profileImage": "image-url",
    "resumeUrl": "resume-url",
    "experience": [...],
    "education": [...],
    "socialLinks": {
      "github": "https://github.com/username",
      "linkedin": "https://linkedin.com/in/username",
      ...
    }
  }
}
```

---

### Update About

**PUT** `/about`

**Auth Required:** Yes

**Request Body:**
```json
{
  "title": "About Me",
  "bio": "Full biography content...",
  "shortBio": "Short bio for preview",
  "profileImage": "https://image-url.jpg",
  "socialLinks": {
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username",
    "twitter": "https://twitter.com/username",
    "email": "hello@example.com"
  }
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "About content updated successfully",
  "data": { ... }
}
```

---

### Add Experience

**POST** `/about/experience`

**Auth Required:** Yes

**Request Body:**
```json
{
  "company": "Tech Company",
  "position": "Senior Developer",
  "startDate": "2021-01-01",
  "endDate": "2023-12-31",
  "current": false,
  "description": "Job description..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Experience added successfully",
  "data": { ... }
}
```

---

### Add Education

**POST** `/about/education`

**Auth Required:** Yes

**Request Body:**
```json
{
  "institution": "University Name",
  "degree": "Bachelor of Science",
  "field": "Computer Science",
  "startDate": "2014-09-01",
  "endDate": "2018-06-01",
  "description": "Education description..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Education added successfully",
  "data": { ... }
}
```

---

## 📧 Contact Endpoints

### Submit Contact Message

**POST** `/contact`

**Auth Required:** No

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a project..."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Message sent successfully! We will get back to you soon.",
  "data": {
    "id": "message_id",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Get All Messages

**GET** `/contact`

**Auth Required:** Yes

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20)
- `read` (boolean) - Filter by read status

**Success Response (200):**
```json
{
  "success": true,
  "message": "Messages retrieved successfully",
  "data": [
    {
      "_id": "message_id",
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Project Inquiry",
      "message": "Message content...",
      "read": false,
      "replied": false,
      "ipAddress": "192.168.1.1",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "pages": 3,
    "limit": 20
  }
}
```

---

### Get Single Message

**GET** `/contact/:id`

**Auth Required:** Yes

**URL Parameters:**
- `id` - Message ID

**Note:** Automatically marks message as read

**Success Response (200):**
```json
{
  "success": true,
  "message": "Message retrieved successfully",
  "data": { ... }
}
```

---

### Mark Message as Read

**PUT** `/contact/:id/read`

**Auth Required:** Yes

**URL Parameters:**
- `id` - Message ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Message marked as read",
  "data": { ... }
}
```

---

### Delete Message

**DELETE** `/contact/:id`

**Auth Required:** Yes

**URL Parameters:**
- `id` - Message ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Message deleted successfully",
  "data": { "id": "message_id" }
}
```

---

## 📤 Upload Endpoints

### Upload Single Image

**POST** `/upload`

**Auth Required:** Yes

**Content-Type:** `multipart/form-data`

**Form Data:**
- `image` (file) - Image file (max 5MB, formats: jpg, jpeg, png, gif, webp)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "url": "https://cloudinary-url.jpg",
    "publicId": "portfolio/image-id",
    "width": 1200,
    "height": 800,
    "format": "jpg"
  }
}
```

---

### Upload Multiple Images

**POST** `/upload/multiple`

**Auth Required:** Yes

**Content-Type:** `multipart/form-data`

**Form Data:**
- `images` (files) - Array of image files (max 10 files, 5MB each)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Images uploaded successfully",
  "data": [
    {
      "url": "https://cloudinary-url-1.jpg",
      "publicId": "portfolio/image-id-1",
      ...
    },
    {
      "url": "https://cloudinary-url-2.jpg",
      "publicId": "portfolio/image-id-2",
      ...
    }
  ]
}
```

---

## 🏥 Health Check

### Server Health

**GET** `/health`

**Auth Required:** No

**Success Response (200):**
```json
{
  "success": true,
  "message": "Server is running",
  "environment": "development",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## ❌ Error Responses

All errors return a consistent format:

```json
{
  "success": false,
  "error": "Error message here",
  "details": {
    // Additional error information
  }
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (action not allowed)
- `404` - Not Found
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

### Example Validation Error (400)

```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "errors": [
      {
        "field": "email",
        "message": "Please provide a valid email"
      },
      {
        "field": "password",
        "message": "Password must be at least 6 characters"
      }
    ]
  }
}
```

### Example Authentication Error (401)

```json
{
  "success": false,
  "error": "Not authorized to access this route. Invalid token."
}
```

---

## 🔄 Rate Limiting

- **General API:** 100 requests per 15 minutes per IP
- **Auth Routes:** 5 login attempts per 15 minutes per IP

When rate limit is exceeded:

**Response (429):**
```json
{
  "success": false,
  "error": "Too many requests from this IP, please try again later."
}
```

---

## 📝 Notes

1. All timestamps are in ISO 8601 format (UTC)
2. MongoDB ObjectIds are 24-character hexadecimal strings
3. Arrays in request bodies should be valid JSON arrays
4. File uploads require `multipart/form-data` content type
5. Protected routes require valid JWT token in Authorization header
6. Search queries use MongoDB text search (indexed fields)
7. Pagination defaults: page=1, limit=10 (projects) or limit=20 (messages)

---

For more details, see the main [README.md](./README.md) or import the [Postman Collection](./postman/PortfolioBackend.postman_collection.json).

