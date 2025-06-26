require('dotenv').config();
const nodemailer = require('nodemailer');

// Create transporter for Mailtrap SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
    port: parseInt(process.env.SMTP_PORT) || 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || "a91d6d790792ba",
      pass: process.env.SMTP_PASSWORD || "****4a03"
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Email template for call report
const createCallReportEmail = (callReport, userData) => {
  const duration = callReport.call_duration ? 
    `${Math.floor(callReport.call_duration / 60)}:${(callReport.call_duration % 60).toString().padStart(2, '0')}` : 
    'N/A';

  const startTime = callReport.start_time ? 
    new Date(callReport.start_time).toLocaleString() : 
    'N/A';

  const endTime = callReport.end_time ? 
    new Date(callReport.end_time).toLocaleString() : 
    'N/A';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>LeadReachAi Demo Call Report</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .section { margin-bottom: 20px; }
        .section h3 { color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 5px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0; }
        .info-item { background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #667eea; }
        .transcript { background: white; padding: 15px; border-radius: 4px; max-height: 300px; overflow-y: auto; font-family: monospace; font-size: 12px; }
        .insights { background: white; padding: 15px; border-radius: 4px; }
        .insight-item { margin: 5px 0; padding: 5px 0; }
        .emoji { font-size: 16px; margin-right: 8px; }
        .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 LeadReachAi Demo Call Report</h1>
          <p>Your AI-powered call analysis is ready!</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h3>📞 Call Summary</h3>
            <div class="info-grid">
              <div class="info-item">
                <strong>Call ID:</strong><br>
                ${callReport.call_id}
              </div>
              <div class="info-item">
                <strong>Status:</strong><br>
                ${callReport.call_status}
              </div>
              <div class="info-item">
                <strong>Duration:</strong><br>
                ${duration}
              </div>
              <div class="info-item">
                <strong>From:</strong><br>
                ${callReport.from_number || 'N/A'}
              </div>
              <div class="info-item">
                <strong>Start Time:</strong><br>
                ${startTime}
              </div>
              <div class="info-item">
                <strong>End Time:</strong><br>
                ${endTime}
              </div>
            </div>
          </div>

          ${callReport.transcript ? `
          <div class="section">
            <h3>💬 Call Transcript</h3>
            <div class="transcript">
              ${callReport.transcript.replace(/\n/g, '<br>')}
            </div>
          </div>
          ` : ''}

          ${callReport.sentiment || callReport.key_topics ? `
          <div class="section">
            <h3>🤖 AI Insights</h3>
            <div class="insights">
              ${callReport.sentiment ? `<div class="insight-item"><span class="emoji">📊</span><strong>Sentiment:</strong> ${callReport.sentiment}</div>` : ''}
              ${callReport.key_topics ? `<div class="insight-item"><span class="emoji">💡</span><strong>Key Topics:</strong> ${callReport.key_topics}</div>` : ''}
              ${callReport.engagement_level ? `<div class="insight-item"><span class="emoji">🎯</span><strong>Engagement Level:</strong> ${callReport.engagement_level}</div>` : ''}
              ${callReport.interested !== undefined ? `<div class="insight-item"><span class="emoji">🎯</span><strong>Interest Level:</strong> ${callReport.interested ? 'Interested' : 'Not Interested'}</div>` : ''}
              ${callReport.business_type ? `<div class="insight-item"><span class="emoji">🏢</span><strong>Business Type:</strong> ${callReport.business_type}</div>` : ''}
              ${callReport.pain_points ? `<div class="insight-item"><span class="emoji">⚠️</span><strong>Pain Points:</strong> ${callReport.pain_points}</div>` : ''}
              ${callReport.follow_up_requested ? `<div class="insight-item"><span class="emoji">📞</span><strong>Follow-up Requested:</strong> Yes</div>` : ''}
            </div>
          </div>
          ` : ''}

          <div class="footer">
            <p>This report was generated by LeadReachAi's AI-powered calling system.</p>
            <p>Thank you for trying our demo!</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
LeadReachAi Demo Call Report

Call Summary:
- Call ID: ${callReport.call_id}
- Status: ${callReport.call_status}
- Duration: ${duration}
- From: ${callReport.from_number || 'N/A'}
- Start Time: ${startTime}
- End Time: ${endTime}

${callReport.transcript ? `
Call Transcript:
${callReport.transcript}
` : ''}

${callReport.sentiment || callReport.key_topics ? `
AI Insights:
${callReport.sentiment ? `- Sentiment: ${callReport.sentiment}` : ''}
${callReport.key_topics ? `- Key Topics: ${callReport.key_topics}` : ''}
${callReport.engagement_level ? `- Engagement Level: ${callReport.engagement_level}` : ''}
${callReport.interested !== undefined ? `- Interest Level: ${callReport.interested ? 'Interested' : 'Not Interested'}` : ''}
${callReport.business_type ? `- Business Type: ${callReport.business_type}` : ''}
${callReport.pain_points ? `- Pain Points: ${callReport.pain_points}` : ''}
${callReport.follow_up_requested ? `- Follow-up Requested: Yes` : ''}
` : ''}

---
This report was generated by LeadReachAi's AI-powered calling system.
Thank you for trying our demo!
  `;

  return {
    html: htmlContent,
    text: textContent
  };
};

module.exports = {
  createTransporter,
  createCallReportEmail
};
