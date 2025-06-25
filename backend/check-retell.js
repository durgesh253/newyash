require('dotenv').config();
const getClient = require('./app/config/retell');

async function checkRetell() {
  try {
    console.log('Checking Retell configuration...');
    console.log('RETELL_API_KEY exists:', !!process.env.RETELL_API_KEY);
    console.log('RETELL_API_KEY length:', process.env.RETELL_API_KEY ? process.env.RETELL_API_KEY.length : 0);
    
    if (!process.env.RETELL_API_KEY) {
      console.error('❌ RETELL_API_KEY environment variable is not set!');
      return;
    }
    
    const client = await getClient();
    console.log('Client created successfully:', !!client);
    
    if (!client) {
      console.error('❌ Failed to create Retell client');
      return;
    }
    
    if (client && client.agent) {
      console.log('✅ Agent API available');
      try {
        const agents = await client.agent.list();
        console.log('Available Agents:', JSON.stringify(agents, null, 2));
      } catch (agentError) {
        console.error('❌ Error listing agents:', agentError.message);
      }
    } else {
      console.log('❌ Agent API not available');
    }
    
    if (client && client.call) {
      console.log('✅ Call API available');
    } else {
      console.log('❌ Call API not available');
    }
    
  } catch (error) {
    console.error('❌ Error checking Retell:', error.message);
    console.error('Full error:', error);
  }
}

checkRetell(); 