const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
// const API_URL = 'https://portfolio-backend-lkeg.onrender.com/api';

async function createAdmin() {
  console.log('🔐 Creating Admin User...\n');

  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      name: 'Admin',
      email: 'admin@portfolio.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!\n');
    console.log('📝 Login Credentials:');
    console.log('   Email: admin@portfolio.com');
    console.log('   Password: admin123\n');
    console.log('🎯 User Details:');
    console.log(`   Name: ${response.data.data.user.name}`);
    console.log(`   Email: ${response.data.data.user.email}`);
    console.log(`   Role: ${response.data.data.user.role}\n`);
    // console.log('🚀 You can now login at: http://localhost:5173/login\n');
    console.log('🚀 You can now login at: https://portfolio-frontend-dbxg.onrender.com/login\n');
    console.log('⚠️  IMPORTANT: After first login, set ALLOW_REGISTER=false in .env for security!');
  } catch (error) {
    console.error('❌ Error creating admin user:\n');

    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Message: ${error.response.data.error || error.response.data.message}`);

      if (error.response.status === 400 && error.response.data.error?.includes('already exists')) {
        console.log('\n✅ Admin user already exists! Use these credentials to login:');
        console.log('   Email: admin@portfolio.com');
        console.log('   Password: admin123');
      } else if (error.response.data.error?.includes('Registration is disabled')) {
        console.log('\n⚠️  Registration is disabled. Set ALLOW_REGISTER=true in .env and restart backend.');
      }
    } else if (error.request) {
      console.error('   Cannot connect to backend!');
      console.error('   Make sure backend is running: cd portfolio-backend && npm run dev');
    } else {
      console.error(`   ${error.message}`);
    }

    process.exit(1);
  }
}

// Run the script
createAdmin();

