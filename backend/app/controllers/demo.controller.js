const getClient = require("../config/retell");
const { demo_global_prompt } = require("../constant/index");
const { createTransporter, createCallReportEmail } = require("../config/nodemailer.config");
const axios = require("axios");
const { db } = require("../models");
const Call = db.call;
const moment = require("moment");
const twilio = require("twilio");
require('dotenv').config();

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Get call report data including recording and transcript
 */
exports.getCallReport = async (req, res) => {
  try {
    const { call_id } = req.params;

    if (!call_id) {
      return res.status(400).json({ error: "Call ID is required" });
    }

    // Initialize Retell client
    const client = await getClient();

    // Get call details from Retell
    const callDetails = await client.call.retrieve(call_id);

    if (!callDetails) {
      return res.status(404).json({ error: "Call not found" });
    }

    // Calculate call duration in seconds
    let callDuration = 0;
    if (callDetails.start_timestamp && callDetails.end_timestamp) {
      callDuration = Math.floor((callDetails.end_timestamp - callDetails.start_timestamp) / 1000);
    } else if (callDetails.call_duration) {
      callDuration = callDetails.call_duration;
    }

    // Get call recording URL if available
    let recordingUrl = null;
    if (callDetails.recording_url) {
      recordingUrl = callDetails.recording_url;
    }
 

    // Get call transcript
    const transcript = callDetails.transcript || [];

    // Get call analysis
    const analysis = callDetails.call_analysis || {};

    // Get call metadata
    const metadata = {
      call_id: callDetails.call_id,
      call_status: callDetails.call_status,
      call_duration: callDuration,
      agent_id: callDetails.agent_id,
      from_number: callDetails.from_number,
      to_number: callDetails.to_number,
      direction: callDetails.direction,
      start_time: callDetails.start_time,
      end_time: callDetails.end_time,
    };

    // Get demo data from database
    const callRecord = await Call.findOne({
      where: { call_id: call_id }
    });

    let demoData = {};
    if (callRecord && callRecord.demo_data) {
      demoData = JSON.parse(callRecord.demo_data);
    }

    // Prepare call report data
    const callReportData = {
      call_id: callDetails.call_id,
      call_status: callDetails.call_status,
      call_duration: callDuration,
      recording_url: recordingUrl,
      transcript: transcript,
      summary: analysis.call_summary,
      sentiment: analysis.sentiment,
      key_topics: analysis.key_topics,
      engagement_level: analysis.engagement_level,
      interested: demoData.interested,
      business_type: demoData.business_type,
      pain_points: demoData.pain_points,
      follow_up_requested: demoData.follow_up_requested,
      start_time: callDetails.start_timestamp,
      end_time: callDetails.end_timestamp,
      from_number: callDetails.from_number,
      to_number: callDetails.to_number,
      caller_name: callRecord?.caller_name || demoData.caller_name,
      caller_email: callRecord?.caller_email || demoData.caller_email,
      language: callRecord?.language || demoData.language,
      accent: callRecord?.accent || demoData.accent,
      voice_type: callRecord?.voice_type || demoData.voice_type
    };

    // Send SMS summary if call is completed and it's a demo call and SMS hasn't been sent yet
    if (callDetails.call_status === 'ended' && demoData.demo_call) {
      console.log("Call completed, attempting to send SMS and Email...");

      // Send SMS if not already sent
      if (!callRecord.sms_sent) {
        try {
          const smsResult = await sendDemoCallSummarySMS(callReportData, callDetails.to_number);
          if (smsResult.success) {
            // Update the database to mark SMS as sent
            await Call.update(
              { sms_sent: true },
              { where: { call_id: call_id } }
            );
            console.log("✅ SMS summary sent successfully for call:", call_id);
          } else {
            console.error("❌ Failed to send SMS summary:", smsResult.error);
          }
        } catch (smsError) {
          console.error("❌ Error sending SMS summary:", smsError);
        }
      } else {
        console.log("SMS already sent for this call");
      }


      // Send Email automatically if not already sent
      if (!callRecord.email_sent && callReportData.caller_email) {
        try {
          const emailResult = await sendCallReportEmail(
            callReportData,
            callReportData.caller_email,
            callReportData.caller_name || 'Demo User'
          );

          if (emailResult.success) {
            // Update the database to mark email as sent
            await Call.update(
              { email_sent: true },
              { where: { call_id: call_id, email_sent: false } }
            );
            console.log("✅ Email report sent successfully for call:", call_id);
            console.log("📧 Email sent to:", callReportData.caller_email);
          } else {
            console.error("❌ Failed to send email report:", emailResult.error);
          }
        } catch (emailError) {
          console.error("❌ Error sending email report:", emailError);
        }
      } else {
        if (callRecord.email_sent) {
          console.log("Email already sent for this call");
        } else if (!callReportData.caller_email) {
          console.log("Email not sent - No caller email available");
        }

      }
    } else {
      if (callDetails.call_status !== 'ended') {
        console.log("SMS not sent - Call status:", callDetails.call_status);
      } else if (!demoData.demo_call) {
        console.log("SMS not sent - Not a demo call");
      } else if (callRecord.sms_sent) {
        console.log("SMS not sent - SMS already sent for this call");
      }
    }

    res.status(200).json({
      success: true,
      report: callReportData
    });

  } catch (error) {
    console.error("Error getting call report:", error);
    res.status(error?.response?.status || 500).json({
      error: "Failed to get call report",
      message: error.message,
    });
  }
};

/**
 * Makes a demo call to showcase AI calling capabilities
 */
exports.makeDemoCall = async (req, res) => {
  try {
    const {
      from_number,
      to_number,
      caller_name,
      caller_email,
      language = "English",
      accent = "US",
      voice_type = "Female",
      override_agent_id,
      voice_id,
    } = req.body;

    // Validate required fields
    if (!to_number) {
      return res.status(400).json({ error: "Recipient phone number is required" });
    }
    if (!caller_name) {
      return res.status(400).json({ error: "Caller name is required" });
    }
    if (!caller_email) {
      return res.status(400).json({ error: "Caller email is required" });
    }

    // Initialize Retell client
    const client = await getClient();

    // Get current UTC time
    const utcMoment = moment.utc();
    const currentTime = utcMoment.format();

    // Check if demo_global_prompt is defined
    if (!demo_global_prompt) {
      console.error("demo_global_prompt is undefined");
      return res.status(500).json({ error: "Internal server error: Prompt configuration missing" });
    }

    // Replace placeholders in the global prompt template
    let global_prompt = demo_global_prompt;

    // Current date/time
    global_prompt = global_prompt.replace(/%current_datetime%/g, currentTime);

    // Caller information
    global_prompt = global_prompt.replace(/%caller_name%/g, caller_name);
    global_prompt = global_prompt.replace(/%caller_email%/g, caller_email);
    global_prompt = global_prompt.replace(/%caller_phone%/g, to_number);
    global_prompt = global_prompt.replace(/%language%/g, language);
    global_prompt = global_prompt.replace(/%accent%/g, accent);
    global_prompt = global_prompt.replace(/%voice_type%/g, voice_type);

    // Update agent voice if provided
    if (voice_id) {
      await client.agent.update(override_agent_id || "agent_a6c2840665ff514332f847df7d", {
        voice_id: voice_id || "custom_voice_0594fccf67c9c6808d33808ca3",
      });
    }

    // Update the conversation flow with the populated prompt
    const payload = { global_prompt };
    const updateUrl = `https://api.retellai.com/update-conversation-flow/conversation_flow_837f32a57cbc`;

    await axios.patch(updateUrl, payload, {  // Use PATCH instead of POST
      headers: {
        Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    // Make the phone call
    const phoneCallResponse = await client.call.createPhoneCall({
      from_number: from_number || "+14153587132",
      to_number: to_number,
      override_agent_id: override_agent_id || "agent_a6c2840665ff514332f847df7d",
    });

    // Save call information to database
    await Call.create({
      user_id: null, // Demo calls don't have a specific user
      caller_name: caller_name,
      caller_email: caller_email,
      language: language,
      accent: accent,
      voice_type: voice_type,
      office_id: null,
      retell_key: `demo_${Date.now()}`, // Generate a unique demo key
      call_id: phoneCallResponse?.call_id,
      call_type: phoneCallResponse?.call_type,
      agent_id: phoneCallResponse?.agent_id,
      call_status: phoneCallResponse?.call_status,
      from_number: phoneCallResponse?.from_number,
      to_number: phoneCallResponse?.to_number,
      direction: phoneCallResponse?.direction,
      status: 1,
      demo_data: JSON.stringify({
        caller_name,
        caller_email,
        language,
        accent,
        voice_type,
        demo_call: true
      }),
    });

    res.status(200).json({
      success: true,
      call: phoneCallResponse,
      demo_info: {
        caller_name,
        caller_email,
        language,
        accent,
        voice_type,
        call_duration_limit: "5 minutes"
      },
    });
  } catch (error) {
    console.error("Error making demo call:", error);
    res.status(error?.response?.status || 500).json({
      error: "Failed to make demo call",
      message: error.message,
    });
  }
};

/**
 * Process completed demo calls and send SMS summaries
 */
exports.processCompletedDemoCalls = async () => {
  try {
    console.log("Processing completed demo calls...");

    // Find completed demo calls that haven't been processed for SMS
    const completedCalls = await Call.findAll({
      where: {
        call_status: 'ended',
        sms_sent: false,
        email_sent: false,
        demo_data: {
          [db.Sequelize.Op.like]: '%"demo_call":true%'
        }
      },
      order: [['createdAt', 'DESC']],
      limit: 10 // Process last 10 calls
    });

    if (completedCalls.length === 0) {
      console.log("No completed demo calls to process");
      return;
    }

    console.log(`Found ${completedCalls.length} completed demo calls to process`);

    for (const callRecord of completedCalls) {
      try {
        // Get call details from Retell
        const client = await getClient();
        const callDetails = await client.call.retrieve(callRecord.call_id);

        if (!callDetails) {
          console.log(`Call details not found for: ${callRecord.call_id}`);
          continue;
        }

        // Parse demo data
        const demoData = JSON.parse(callRecord.demo_data || '{}');

        // Prepare call data for SMS
        const callData = {
          call_id: callDetails.call_id,
          call_status: callDetails.call_status,
          call_duration: callDetails.call_duration,
          summary: callDetails.call_analysis?.call_summary,
          sentiment: callDetails.call_analysis?.sentiment,
          caller_name: callRecord.caller_name || demoData.caller_name,
          to_number: callDetails.to_number
        };

        // Send SMS
        const smsResult = await sendDemoCallSummarySMS(callData, callDetails.to_number);

        if (smsResult.success) {
          // Update the database to mark SMS as sent
          await Call.update(
            { sms_sent: true },
            { where: { call_id: callRecord.call_id } }
          );
          console.log(`✅ SMS sent for call: ${callRecord.call_id}`);
        } else {
          console.error(`❌ Failed to send SMS for call: ${callRecord.call_id}`, smsResult.error);
        }

      } catch (error) {
        console.error(`Error processing call ${callRecord.call_id}:`, error.message);
      }
    }

  } catch (error) {
    console.error("Error processing completed demo calls:", error.message);
  }
};

/**
 * Process completed demo calls for analysis
 */
exports.demoCallAnalysisCron = async () => {
  try {
    const client = await getClient();

    // Find ended demo calls that need processing
    const callDetail = await Call.findOne({
      where: {
        call_status: 'ended',
        status: 3,
        demo_data: {
          [db.Sequelize.Op.like]: '%"demo_call":true%'
        }
      },
    });

    if (!callDetail) {
      console.log("No completed demo calls to process");
      return;
    }

    // Get call details from Retell
    const callResponses = await client.call.retrieve(callDetail?.call_id);

    if (!callResponses) {
      console.log("No call responses available");
      return;
    }

    // Update call status
    await Call.update(
      { status: 2 },
      { where: { id: callDetail?.id } }
    );

    // Extract data from transcript
    const OpenAI = require("openai");
    const { z } = require("zod");
    const { zodResponseFormat } = require("openai/helpers/zod");

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_APIKEY,
    });

    // Define the expected structure for extracted data
    const conversationStruct = z.object({
      interested: z.boolean().nullable(),
      business_type: z.string().nullable(),
      current_calling_solution: z.string().nullable(),
      pain_points: z.string().nullable(),
      follow_up_requested: z.boolean().nullable(),
    });

    // Request AI to extract structured details from the transcript
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content: `Read the following conversation between an AI assistant and a potential customer during a demo call.
Analyze the conversation to understand the customer's interest and business needs.

Extract the relevant details and return them in JSON format:
- interested: Whether the customer showed interest in the AI calling solution (true/false)
- business_type: The type of business the customer mentioned
- current_calling_solution: What they currently use for customer calls
- pain_points: Any challenges they mentioned with their current calling process
- follow_up_requested: Whether they requested a follow-up or more information

Do NOT fabricate missing data. If a value is not present, return null.`,
        },
        { role: "user", content: callResponses?.transcript },
      ],
      response_format: zodResponseFormat(conversationStruct, "demo_data"),
    });

    // Extract the structured data
    let extractedData = completion.choices?.[0]?.message?.parsed || {};

    // Parse demo data from database
    const demoData = JSON.parse(callDetail?.demo_data || '{}');

    // Send data to your main system (optional)
    const updateData = {
      call_status: callResponses?.call_status,
      summary: callResponses?.call_analysis?.call_summary,
      interested: extractedData?.interested,
      business_type: extractedData?.business_type,
      current_calling_solution: extractedData?.current_calling_solution,
      pain_points: extractedData?.pain_points,
      follow_up_requested: extractedData?.follow_up_requested,
      demo_key: callDetail?.retell_key,
      call_id: callDetail?.call_id,
      caller_name: callDetail?.caller_name || demoData?.caller_name,
      caller_email: callDetail?.caller_email || demoData?.caller_email,
      recording_url: callResponses?.recording_url,
      transcript: callResponses?.transcript,
      call_duration: callResponses?.call_duration,
    };

    // You can send this data to your CRM or email system
    console.log("Demo call analysis completed:", updateData);

    console.log("Successfully processed completed demo call:", callDetail?.call_id);
  } catch (error) {
    console.error("Error processing completed demo calls:", error.message);
  }
};

/**
 * Get demo call statistics
 */
exports.getDemoCallStats = async (req, res) => {
  try {
    const demoCalls = await Call.findAll({
      where: {
        demo_data: {
          [db.Sequelize.Op.like]: '%"demo_call":true%'
        }
      },
      order: [['createdAt', 'DESC']]
    });

    const stats = {
      total_demo_calls: demoCalls.length,
      successful_calls: demoCalls.filter(call => call.call_status === 'ended').length,
      ongoing_calls: demoCalls.filter(call => call.call_status === 'ongoing').length,
      failed_calls: demoCalls.filter(call => call.call_status === 'failed').length,
      recent_calls: demoCalls.slice(0, 10).map(call => ({
        id: call.id,
        call_id: call.call_id,
        caller_name: call.caller_name || JSON.parse(call.demo_data || '{}').caller_name,
        caller_email: call.caller_email || JSON.parse(call.demo_data || '{}').caller_email,
        call_status: call.call_status,
        created_at: call.createdAt
      }))
    };

    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    console.error("Error fetching demo call stats:", error);
    res.status(500).json({
      error: "Failed to fetch demo call statistics",
      message: error.message,
    });
  }
};


/**
 * Send SMS summary for a specific demo call
 */
exports.sendDemoCallSMS = async (req, res) => {
  try {
    const { call_id } = req.params;

    if (!call_id) {
      return res.status(400).json({ error: "Call ID is required" });
    }

    // Get call details from database
    const callRecord = await Call.findOne({
      where: { call_id: call_id }
    });

    if (!callRecord) {
      return res.status(404).json({ error: "Call not found" });
    }

    // Check if SMS has already been sent for this call
    if (callRecord.sms_sent) {
      return res.status(400).json({
        error: "SMS has already been sent for this call",
        message: "This call has already received an SMS summary"
      });
    }

    // Get call details from Retell
    const client = await getClient();
    const callDetails = await client.call.retrieve(call_id);

    if (!callDetails) {
      return res.status(404).json({ error: "Call details not found" });
    }

    // Extract data from transcript using OpenAI
    const OpenAI = require("openai");
    const { z } = require("zod");
    const { zodResponseFormat } = require("openai/helpers/zod");

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_APIKEY,
    });

    const conversationStruct = z.object({
      interested: z.boolean().nullable(),
      business_type: z.string().nullable(),
      current_calling_solution: z.string().nullable(),
      pain_points: z.string().nullable(),
      follow_up_requested: z.boolean().nullable(),
    });

    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content: `Read the following conversation between an AI assistant and a potential customer during a demo call.
Analyze the conversation to understand the customer's interest and business needs.

Extract the relevant details and return them in JSON format:
- interested: Whether the customer showed interest in the AI calling solution (true/false)
- business_type: The type of business the customer mentioned
- current_calling_solution: What they currently use for customer calls
- pain_points: Any challenges they mentioned with their current calling process
- follow_up_requested: Whether they requested a follow-up or more information

Do NOT fabricate missing data. If a value is not present, return null.`,
        },
        { role: "user", content: callDetails?.transcript },
      ],
      response_format: zodResponseFormat(conversationStruct, "demo_data"),
    });

    const extractedData = completion.choices?.[0]?.message?.parsed || {};
    const demoData = JSON.parse(callRecord?.demo_data || '{}');

    const callData = {
      call_status: callDetails?.call_status,
      summary: callDetails?.call_analysis?.call_summary,
      interested: extractedData?.interested,
      business_type: extractedData?.business_type,
      current_calling_solution: extractedData?.current_calling_solution,
      pain_points: extractedData?.pain_points,
      follow_up_requested: extractedData?.follow_up_requested,
      call_id: callDetails?.call_id,
      caller_name: callRecord?.caller_name || demoData?.caller_name,
      caller_email: callRecord?.caller_email || demoData?.caller_email,
      call_duration: callDetails?.call_duration,
    };

    // Send SMS
    const smsResult = await sendDemoCallSummarySMS(callData, callRecord.to_number);

    if (smsResult.success) {
      // Update the database to mark SMS as sent
      await Call.update(
        { sms_sent: true },
        { where: { call_id: call_id } }
      );

      res.status(200).json({
        success: true,
        message: "SMS sent successfully",
        messageId: smsResult.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Failed to send SMS",
        message: smsResult.error
      });
    }

  } catch (error) {
    console.error("Error sending demo call SMS:", error);
    res.status(500).json({
      error: "Failed to send demo call SMS",
      message: error.message,
    });
  }
};

/**
 * Send call report via email
 */
/**
 * Send call report via email (DEPRECATED - Emails are now sent automatically)
 */


/**
 * Send SMS with demo call summary
 */
const sendDemoCallSummarySMS = async (callData, toNumber) => {
  try {
    // Check if Twilio is configured
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      console.log("Twilio not configured, skipping SMS");
      return { success: false, error: "Twilio not configured" };
    }

    // Format call duration
    const duration = callData.call_duration ?
      Math.floor(callData.call_duration / 60) + 'm ' + (callData.call_duration % 60) + 's' :
      'Unknown';

    // Create SMS message content
    let messageBody = `🎯 LeadReachAi Demo Call Summary\n\n`;
    messageBody += `Hi ${callData.caller_name || 'there'}!\n\n`;
    messageBody += `Your demo call has been completed.\n`;


    // if (callData.summary) {
    //   // Truncate summary if too long (SMS has 1600 character limit)
    //   const summary = callData.summary.length > 150 ?
    //     callData.summary.substring(0, 150) + '...' :
    //     callData.summary;
    //   messageBody += `Summary: ${summary}\n\n`;
    // }
    console.log("callData.summary", callData.summary);

    if (callData.sentiment) {
      messageBody += `Sentiment: ${callData.sentiment}\n`;
    }
    console.log("callData.sentiment", callData.sentiment);
    if (callData.interested !== undefined && callData.interested !== null) {
      messageBody += `Interest: ${callData.interested ? '✅ Yes' : '❌ No'}\n`;
    }

    if (callData.business_type) {
      messageBody += `Business: ${callData.business_type}\n`;
    }
    console.log("callData.business_type", callData.business_type);
    if (callData.follow_up_requested) {
      messageBody += `\n📞 Follow-up requested!\n`;
    }
    console.log("callData.follow_up_requested", callData.follow_up_requested);

    messageBody += `\nThank you for trying LeadReachAi!`;

    // Add caller email if available
    if (callData.caller_email) {
      messageBody += `\n\n📧 Detailed report sent to: ${callData.caller_email}`;
    } else {
      messageBody += `\n\n📧 Detailed report sent to your email.`;
    }

    // Send SMS using Twilio
    const message = await twilioClient.messages.create({
      body: messageBody,
      from: process.env.TWILIO_PHONE_NUMBER || "+14153587132", // Your Twilio phone number
      to: toNumber,
    });

    console.log("SMS sent successfully:", message.sid);
    return { success: true, messageId: message.sid };
  } catch (error) {
    console.error("Error sending SMS:", error);
    return { success: false, error: error.message };
  }
};



/**
 * Test endpoint to manually trigger SMS for a specific call
 */
exports.testSMSForCall = async (req, res) => {
  try {
    const { call_id } = req.params;

    if (!call_id) {
      return res.status(400).json({ error: "Call ID is required" });
    }

    console.log(`Testing SMS for call: ${call_id}`);

    // Get call details from Retell
    const client = await getClient();
    const callDetails = await client.call.retrieve(call_id);

    if (!callDetails) {
      return res.status(404).json({ error: "Call not found in Retell" });
    }

    // Get call record from database
    const callRecord = await Call.findOne({
      where: { call_id: call_id }
    });

    if (!callRecord) {
      return res.status(404).json({ error: "Call record not found in database" });
    }

    // Check if SMS has already been sent for this call
    if (callRecord.sms_sent) {
      return res.status(400).json({
        error: "SMS has already been sent for this call",
        message: "This call has already received an SMS summary"
      });
    }

    let demoData = {};
    if (callRecord.demo_data) {
      demoData = JSON.parse(callRecord.demo_data);
    }

    // Prepare call data for SMS
    const callData = {
      call_id: callDetails.call_id,
      call_status: callDetails.call_status,
      call_duration: callDetails.call_duration,
      summary: callDetails.call_analysis?.call_summary || "Call completed successfully",
      sentiment: callDetails.call_analysis?.sentiment || "Positive",
      interested: demoData.interested,
      business_type: demoData.business_type,
      follow_up_requested: demoData.follow_up_requested,
      caller_name: callRecord.caller_name || demoData.caller_name || "Demo User",
      caller_email: callRecord.caller_email || demoData.caller_email,
      to_number: callDetails.to_number
    };

    console.log("Sending SMS with data:", callData);

    // Send SMS
    const smsResult = await sendDemoCallSummarySMS(callData, callDetails.to_number);

    if (smsResult.success) {
      // Update the database to mark SMS as sent
      await Call.update(
        { sms_sent: true },
        { where: { call_id: call_id } }
      );

      res.status(200).json({
        success: true,
        message: "SMS sent successfully",
        messageId: smsResult.messageId,
        callData: callData
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Failed to send SMS",
        message: smsResult.error,
        callData: callData
      });
    }

  } catch (error) {
    console.error("Error testing SMS for call:", error);
    res.status(500).json({
      error: "Failed to test SMS",
      message: error.message,
    });
  }
};

/**
 * Send SMS summary for a specific call (for testing)
 */
exports.sendCallSummarySMS = async (req, res) => {
  try {
    const { call_id } = req.params;

    if (!call_id) {
      return res.status(400).json({ error: "Call ID is required" });
    }

    // Get call details from Retell
    const client = await getClient();
    const callDetails = await client.call.retrieve(call_id);

    if (!callDetails) {
      return res.status(404).json({ error: "Call not found" });
    }

    // Get call record from database
    const callRecord = await Call.findOne({
      where: { call_id: call_id }
    });

    if (!callRecord) {
      return res.status(404).json({ error: "Call record not found in database" });
    }

    // Check if SMS has already been sent for this call
    if (callRecord.sms_sent) {
      return res.status(400).json({
        error: "SMS has already been sent for this call",
        message: "This call has already received an SMS summary"
      });
    }

    let demoData = {};
    if (callRecord.demo_data) {
      demoData = JSON.parse(callRecord.demo_data);
    }

    // Prepare call data for SMS
    const callData = {
      call_id: callDetails.call_id,
      call_status: callDetails.call_status,
      call_duration: callDetails.call_duration,
      summary: callDetails.call_analysis?.call_summary,
      sentiment: callDetails.call_analysis?.sentiment,
      interested: demoData.interested,
      business_type: demoData.business_type,
      follow_up_requested: demoData.follow_up_requested,
      caller_name: callRecord.caller_name || demoData.caller_name,
      caller_email: callRecord.caller_email || demoData.caller_email,
      to_number: callDetails.to_number
    };

    // Send SMS
    const smsResult = await sendDemoCallSummarySMS(callData, callDetails.to_number);

    if (smsResult.success) {
      // Update the database to mark SMS as sent
      await Call.update(
        { sms_sent: true },
        { where: { call_id: call_id } }
      );

      res.status(200).json({
        success: true,
        message: "SMS summary sent successfully",
        messageId: smsResult.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Failed to send SMS",
        message: smsResult.error
      });
    }

  } catch (error) {
    console.error("Error sending call summary SMS:", error);
    res.status(500).json({
      error: "Failed to send call summary SMS",
      message: error.message,
    });
  }
};

/**
 * Send call report via email using Resend API
 */
const sendCallReportEmail = async (callReport, userEmail, userName) => {
  try {
    // Use Resend API instead of SMTP
    const emailContent = createCallReportEmail(callReport, { email: userEmail, name: userName });
    
    const resendData = {
      from: process.env.RESEND_FROM_EMAIL || 'noreply@aiyug.us',
      to: [userEmail],
      subject: `🎯 LeadReachAi Demo Call Report - ${callReport.call_id}`,
      html: emailContent.html,
      text: emailContent.text
    };

    const response = await axios.post('https://api.resend.com/emails', resendData, {
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    });

    console.log("Call report email sent successfully via Resend:", response.data.id);
    return { success: true, messageId: response.data.id, resendId: response.data.id };
  } catch (error) {
    console.error("Error sending call report email:", error.response?.data || error.message);
    return { success: false, error: error.response?.data?.message || error.message };
  }
}; 