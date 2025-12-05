const fs = require('fs');
const path = require('path');

// Read env.example
const envExample = fs.readFileSync(path.join(__dirname, 'env.example'), 'utf8');

// Create .env file
const envPath = path.join(__dirname, '.env');

// Check if .env already exists
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  console.log('📝 If you want to recreate it, delete the existing .env file first.');
  process.exit(0);
}

// Write .env file
fs.writeFileSync(envPath, envExample);
console.log('✅ .env file created successfully!');
console.log('📝 Please edit .env file with your actual values:');
console.log('   - MongoDB Atlas connection string');
console.log('   - JWT secret (generate with: openssl rand -base64 32)');
console.log('   - Cloudinary credentials (if using image uploads)');
console.log('   - Frontend URL for CORS');

