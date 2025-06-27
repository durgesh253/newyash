// API Configuration
const getApiUrl = () => {
  // Check if we're in development mode
  if (process.env.NODE_ENV === 'development') {
    return process.env.REACT_APP_API_URL || 'http://localhost:3003';
  }
  
  // Production - use deployed backend
  return process.env.REACT_APP_API_URL || 'https://leadreachai-2.onrender.com';
};

export const API_BASE_URL = getApiUrl();

// API Endpoints
export const API_ENDPOINTS = {
  DEMO_CALL: `${API_BASE_URL}/api/demo-call`,
  CALL_REPORT: (callId: string) => `${API_BASE_URL}/api/call-report/${callId}`,
  SEND_EMAIL_REPORT: `${API_BASE_URL}/api/send-call-report-email`,
}; 