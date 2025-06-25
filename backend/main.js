const axios = require('axios');


async function main() {
  try {
    const apiKey = 'UVjItR2HUMjCyo7q5uwhsmAmghGAGg1Z'; // Replace with your actual API key
    
    const axios = require('axios');

    const options = {
      method: 'POST',
      url: 'https://api.openphone.com/v1/messages',
      headers: {
        'Authorization': 'UVjItR2HUMjCyo7q5uwhsmAmghGAGg1Z', // Replace with your actual API key
        'Content-Type': 'application/json'
      },
      data: {
        content: 'hello',  // Replace with your OpenPhone number ID
        from: '+12317585617', // Replace with the sender info (typically the phone number or OpenPhone ID)
        to: ['+18882912620'], // Replace with the recipient's phone number
        userId: 'US9tu6QNXw', // Replace with the user's ID
        setInboxStatus: 'done'
      }
    };
    
    axios.request(options)
      .then(response => {
        console.log('Message sent:', response.data);
      })
      .catch(error => {
        console.log(error)
        console.error('Error sending message:', error.response?.data || error.message);
      });
    
  } catch (error) {
    console.log(error)
    console.error('Failed to send message:', error.message);
  }
}

main();