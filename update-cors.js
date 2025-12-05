const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

try {
  // Read the .env file
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Replace the CLIENT_ORIGIN
  envContent = envContent.replace(
    /CLIENT_ORIGIN=http:\/\/localhost:3000/g,
    'CLIENT_ORIGIN=http://localhost:5173'
  );
  
  // Write it back
  fs.writeFileSync(envPath, envContent, 'utf8');
  
  console.log('✅ Updated CLIENT_ORIGIN to http://localhost:5173');
  console.log('✅ CORS fixed! Restart the backend server now.');
} catch (error) {
  console.error('❌ Error updating .env:', error.message);
}

