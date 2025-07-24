const axios = require('axios');

async function testDemoEndpoint() {
  try {
    console.log('Testing demo endpoint...');
    
    const testData = {
      to_number: '+919054760377', // Your test number
      caller_name: 'Test User',
      caller_email: 'test@example.com',
      language: 'English',
      accent: 'US',
      voice_type: 'Female'
    };

    console.log('Sending request to demo endpoint with data:', testData);

    const response = await axios.post('http://localhost:8080/api/demo-call', testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Demo endpoint response:', response.data);
    
    if (response.data.success) {
      console.log('✅ Demo call initiated successfully!');
      console.log('Call ID:', response.data.call?.call_id);
      console.log('Call Status:', response.data.call?.call_status);
    } else {
      console.log('❌ Demo call failed:', response.data.error);
    }

  } catch (error) {
    console.error('❌ Error testing demo endpoint:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the backend server is running on port 8080');
      console.log('   Run: cd backend && npm start');
    }
  }
}

// Run the test
testDemoEndpoint(); 