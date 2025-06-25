# Demo Call Functionality

This document describes the demo call functionality that allows users to experience AI-powered calling capabilities through a web interface.

## Overview

The demo call system integrates with Retell AI to provide a seamless demonstration of AI calling capabilities. Users can:

1. Enter their phone number
2. Customize language, accent, and voice preferences
3. Provide their name and email
4. Receive an AI-powered demo call

## Backend Components

### 1. Demo Controller (`app/controllers/demo.controller.js`)

The main controller handles demo call functionality:

- **`makeDemoCall`**: Initiates a demo call with Retell AI
- **`demoCallAnalysisCron`**: Processes completed demo calls for analysis
- **`getDemoCallStats`**: Retrieves demo call statistics

### 2. API Routes

Added to `app/routes/api.routes.js`:

```javascript
// Demo call routes
app.post('/api/demo-call', demoController.makeDemoCall);
app.get('/api/demo-call-stats', demoController.getDemoCallStats);
```

### 3. Demo Prompt

The demo call uses a custom prompt defined in `app/constant/index.js`:

- Introduces LeadReachAi services
- Explains AI calling capabilities
- Provides information about the caller
- Sets conversation guidelines

## Frontend Components

### DemoForm Component (`frontend/src/components/DemoForm.tsx`)

A multi-step form that guides users through the demo call process:

1. **Initial Step**: Phone number input with TCPA consent
2. **Personalization Step**: Language, accent, voice type, name, and email
3. **Calling Step**: Shows call status and progress
4. **Report Step**: Displays call results and analytics

## API Endpoints

### POST `/api/demo-call`

Initiates a demo call.

**Request Body:**
```json
{
  "to_number": "+1234567890",
  "caller_name": "John Doe",
  "caller_email": "john@example.com",
  "language": "English",
  "accent": "US",
  "voice_type": "Female",
  "from_number": "+14153587132",
  "override_agent_id": "agent_1d0292b304cceaccd4a0044755",
  "voice_id": "custom_voice_928d333ec977dcdfc656114d21"
}
```

**Response:**
```json
{
  "success": true,
  "call": {
    "call_id": "call_123456789",
    "call_status": "initiated",
    "agent_id": "agent_1d0292b304cceaccd4a0044755"
  },
  "demo_info": {
    "caller_name": "John Doe",
    "caller_email": "john@example.com",
    "language": "English",
    "accent": "US",
    "voice_type": "Female",
    "call_duration_limit": "5 minutes"
  }
}
```

### GET `/api/demo-call-stats`

Retrieves demo call statistics.

**Response:**
```json
{
  "success": true,
  "stats": {
    "total_demo_calls": 10,
    "successful_calls": 8,
    "ongoing_calls": 1,
    "failed_calls": 1,
    "recent_calls": [...]
  }
}
```

## Setup Instructions

### 1. Environment Variables

Ensure these environment variables are set in your `.env` file:

```env
RETELL_API_KEY=your_retell_api_key
OPENAI_APIKEY=your_openai_api_key
PHONE_NUMBER=+14153587132
```

### 2. Database

The demo calls are stored in the `calls` table with additional `demo_data` field containing:

```json
{
  "caller_name": "John Doe",
  "caller_email": "john@example.com",
  "language": "English",
  "accent": "US",
  "voice_type": "Female",
  "demo_call": true
}
```

### 3. Retell Configuration

The demo calls use:
- **Agent ID**: `agent_1d0292b304cceaccd4a0044755`
- **Conversation Flow**: `conversation_flow_436a875b65e6`
- **Voice ID**: `custom_voice_928d333ec977dcdfc656114d21`

## Testing

### Manual Testing

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Navigate to the demo form and test the functionality

### Automated Testing

Run the test script:
```bash
cd backend
node test-demo-call.js
```

## Features

- **Multi-language Support**: English, Spanish
- **Accent Options**: US, UK, Indian
- **Voice Types**: Male, Female
- **TCPA Compliance**: Consent modal for phone calls
- **Call Analytics**: Transcript and sentiment analysis
- **Error Handling**: Comprehensive error messages
- **Loading States**: Visual feedback during call initiation

## Security Considerations

- Phone number validation
- Email validation
- TCPA compliance
- Rate limiting (can be implemented)
- Input sanitization

## Future Enhancements

- Real-time call status updates via WebSocket
- Call recording download
- Email report delivery
- Integration with CRM systems
- Advanced analytics dashboard
- Multi-language UI support 