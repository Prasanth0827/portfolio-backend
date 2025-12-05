require('dotenv').config();

console.log('\n🔍 Checking Cloudinary Configuration...\n');

const hasCloudName = !!process.env.CLOUDINARY_CLOUD_NAME;
const hasApiKey = !!process.env.CLOUDINARY_API_KEY;
const hasApiSecret = !!process.env.CLOUDINARY_API_SECRET;

console.log(`CLOUDINARY_CLOUD_NAME: ${hasCloudName ? '✅ Set' : '❌ Missing'}`);
console.log(`CLOUDINARY_API_KEY: ${hasApiKey ? '✅ Set' : '❌ Missing'}`);
console.log(`CLOUDINARY_API_SECRET: ${hasApiSecret ? '✅ Set' : '❌ Missing'}`);

if (hasCloudName && hasApiKey && hasApiSecret) {
  console.log('\n✅ Cloudinary is configured!\n');
  console.log('Restart your backend to use Cloudinary for uploads:');
  console.log('  npm run dev\n');
} else {
  console.log('\n⚠️  Cloudinary is NOT configured\n');
  console.log('Current behavior:');
  console.log('  - Images use base64 storage ✅');
  console.log('  - Works for images < 1MB ✅');
  console.log('  - Saved to MongoDB ✅\n');
  console.log('To enable Cloudinary:');
  console.log('  1. Sign up: https://cloudinary.com/users/register/free');
  console.log('  2. Get credentials from Dashboard');
  console.log('  3. Add to .env file');
  console.log('  4. Restart backend\n');
}

