const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function createSpidyUser() {
  console.log('🕷️  Creating Spidy User...\n');

  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      name: 'Spidy',
      email: 'spidy@portfolio.com',
      password: 'spidy',
      role: 'admin'
    });

    console.log('✅ Spidy user created successfully!\n');
    console.log('📝 Login Credentials:');
    console.log('   Username: spidy  (just type "spidy" - no @portfolio.com needed)');
    console.log('   Password: spidy\n');
    console.log('🎯 User Details:');
    console.log(`   Name: ${response.data.data.user.name}`);
    console.log(`   Email: ${response.data.data.user.email}`);
    console.log(`   Role: ${response.data.data.user.role}\n`);
    console.log('🚀 You can now login at: http://localhost:5173/login');
    console.log('   Just enter "spidy" / "spidy" - the @portfolio.com is added automatically!\n');
  } catch (error) {
    if (error.response?.data?.error?.includes('already exists')) {
      console.log('✅ Spidy user already exists!\n');
      console.log('📝 Login Credentials:');
      console.log('   Username: spidy');
      console.log('   Password: spidy\n');
      console.log('🚀 You can login at: http://localhost:5173/login');
    } else {
      console.error('❌ Error creating user:');
      console.error(JSON.stringify(error.response?.data || error.message, null, 2));
    }
  }
}

createSpidyUser();

