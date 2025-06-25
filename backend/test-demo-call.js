// test-demo-call.js
const axios = require('axios');

async function testDemoCall() {
  try {
    console.log('Testing demo call functionality...');
    
    const testData = {
      to_number: '+1234567890', // Replace with a real test number
      caller_name: 'John Doe',
      caller_email: 'john.doe@example.com',
      language: 'English',
      accent: 'US',
      voice_type: 'Female'
    };

    console.log('Sending demo call request with data:', testData);

    const response = await axios.post('http://localhost:8080/api/demo-call', testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Demo call response:', response.data);
    
    if (response.data.success) {
      console.log('✅ Demo call initiated successfully!');
      console.log('Call ID:', response.data.call?.call_id);
      console.log('Call Status:', response.data.call?.call_status);
    } else {
      console.log('❌ Demo call failed:', response.data.error);
    }

  } catch (error) {
    console.error('❌ Error testing demo call:', error.response?.data || error.message);
  }
}

// Run the test
testDemoCall(); 