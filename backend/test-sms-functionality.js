const axios = require('axios');

async function testSMSFunctionality() {
  try {
    console.log('Testing SMS functionality...');
    
    // Test 1: Check if Twilio is configured
    console.log('\n1. Checking Twilio configuration...');
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      console.log('❌ Twilio not configured. Please set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in your .env file');
      return;
    }
    console.log('✅ Twilio configuration found');

    // Test 2: Test SMS endpoint (if you have a call ID)
    console.log('\n2. Testing SMS endpoint...');
    const testCallId = 'call_81eebe766187855c71a33996ed3'; // Replace with an actual call ID
    
    if (testCallId !== 'call_81eebe766187855c71a33996ed3') {
      console.log('Testing with call ID:', testCallId);
      
      // Test the new SMS endpoint
      const response = await axios.post(`http://localhost:8080/api/test-sms/${testCallId}`, {}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ SMS test response:', response.data);
    } else {
      console.log('⚠️  Skipping SMS endpoint test - please update testCallId with a real call ID');
      console.log('💡 You can get a call ID from your demo calls or database');
    }

    // Test 3: Test demo call with SMS
    console.log('\n3. Testing demo call with SMS...');
    const testData = {
      to_number: '+919054760377', // Your test number
      caller_name: 'SMS Test User',
      caller_email: 'sms-test@example.com',
      language: 'English',
      accent: 'US',
      voice_type: 'Female'
    };

    const demoResponse = await axios.post('http://localhost:8080/api/demo-call', testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (demoResponse.data.success) {
      console.log('✅ Demo call initiated successfully!');
      console.log('Call ID:', demoResponse.data.call?.call_id);
      console.log('📱 SMS will be sent automatically when call completes');
    } else {
      console.log('❌ Demo call failed:', demoResponse.data.error);
    }

  } catch (error) {
    console.error('❌ Error testing SMS functionality:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the backend server is running on port 8080');
      console.log('   Run: cd backend && npm start');
    }
  }
}

// Run the test
testSMSFunctionality(); 