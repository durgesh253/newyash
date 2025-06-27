# API Configuration Setup

## Overview
Your frontend is now configured to automatically use the correct API URL based on the environment:

- **Development**: Uses `http://localhost:3003` (when running locally)
- **Production**: Uses `https://leadreachai-2.onrender.com` (your deployed backend)

## How it works

The configuration is in `src/config/api.ts`:

```typescript
const getApiUrl = () => {
  // Check if we're in development mode
  if (process.env.NODE_ENV === 'development') {
    return process.env.REACT_APP_API_URL || 'http://localhost:3003';
  }
  
  // Production - use deployed backend
  return process.env.REACT_APP_API_URL || 'https://leadreachai-2.onrender.com';
};
```

## Environment Variables (Optional)

If you want to override the default URLs, you can create environment files:

### For Development (.env.development)
```
REACT_APP_API_URL=http://localhost:3003
```

### For Production (.env.production)
```
REACT_APP_API_URL=https://leadreachai-2.onrender.com
```

## Current Setup

- ✅ **Development**: Will use `http://localhost:3003` when you run `npm run dev`
- ✅ **Production**: Will use `https://leadreachai-2.onrender.com` when deployed
- ✅ **Fallback**: If no environment variable is set, it uses the appropriate default

## API Endpoints Used

The DemoForm component now uses these endpoints:
- `API_ENDPOINTS.DEMO_CALL` - For initiating demo calls
- `API_ENDPOINTS.CALL_REPORT(callId)` - For fetching call reports
- `API_ENDPOINTS.SEND_EMAIL_REPORT` - For sending email reports

No further configuration needed! The app will automatically use the correct backend URL. 