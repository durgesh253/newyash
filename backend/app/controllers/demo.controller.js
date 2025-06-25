const getClient = require("../config/retell");
const { demo_global_prompt } = require("../constant/index");
const axios = require("axios");
const { db } = require("../models");
const Call = db.call;
const moment = require("moment");
require('dotenv').config();

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

    res.status(200).json({
      success: true,
      report: {
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
        to_number: callDetails.to_number
      }
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
      await client.agent.update(override_agent_id || "agent_6d8b57031916c5e85b08636e08", {
        voice_id: voice_id || "custom_voice_0594fccf67c9c6808d33808ca3",
      });
    }

    // Update the conversation flow with the populated prompt
    const payload = { global_prompt };
    const updateUrl = `https://api.retellai.com/update-conversation-flow/conversation_flow_759605c1478c`;

    await axios.post(updateUrl, payload, {
      headers: {
        Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    // Make the phone call
    const phoneCallResponse = await client.call.createPhoneCall({
      from_number: from_number || "+13528396109",
      to_number: to_number,
      override_agent_id: override_agent_id || "agent_6d8b57031916c5e85b08636e08",
    });

    // Save call information to database
    await Call.create({
      user_id: null, // Demo calls don't have a specific user
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
      caller_name: demoData?.caller_name,
      caller_email: demoData?.caller_email,
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
        caller_name: JSON.parse(call.demo_data || '{}').caller_name,
        caller_email: JSON.parse(call.demo_data || '{}').caller_email,
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