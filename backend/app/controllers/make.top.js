// controllers/reservationController.js
const getClient = require("../config/retell");
const { reservation_global_prompt } = require("../constant/index");
const axios = require("axios");
const { db } = require("../models");
const Call = db.call;
const moment = require("moment");
require('dotenv').config();
/**
 * Makes a call to a customer for a reservation
 */exports.makeReservationCall = async (req, res) => {
  try {
    const {
      from_number,
      to_number,
      reservationId,
      override_agent_id,
      voice_id,
    } = req.body;

    // Validate required fields
    if (!to_number) {
      return res.status(400).json({ error: "Recipient phone number is required" });
    }
    if (!reservationId) {
      return res.status(400).json({ error: "Reservation ID is required" });
    }

    // Initialize Retell client
    const client = await getClient();

    // Get current UTC time
    const utcMoment = moment.utc();
    const currentTime = utcMoment.format();

    // Fetch reservation data
    const reservationData = await getReservationById(reservationId);
    if (!reservationData) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    // Extract property and guest data
    const property = reservationData.properties?.[0] || {};
    const guest = reservationData.guest || {};

    // Format dates and times
    const formattedArrival = moment(reservationData.arrival_date).format("MMMM D, YYYY");
    const formattedDeparture = moment(reservationData.departure_date).format("MMMM D, YYYY");
    const formattedCheckIn = moment(reservationData.check_in).format("h:mm A");
    const formattedCheckOut = moment(reservationData.check_out).format("h:mm A");

    // Check if reservation_global_prompt is defined
    if (!reservation_global_prompt) {
      console.error("reservation_global_prompt is undefined");
      return res.status(500).json({ error: "Internal server error: Prompt configuration missing" });
    }

    // Replace placeholders in the global prompt template
    let global_prompt = reservation_global_prompt;

    // Current date/time
    global_prompt = global_prompt.replace(/%current_datetime%/g, currentTime);

    // Guest information
    global_prompt = global_prompt.replace(/%guest_name%/g, `${guest.first_name || ''} ${guest.last_name || ''}`);
    global_prompt = global_prompt.replace(/%guest_language%/g, guest.language || "English");

    // Reservation information
    global_prompt = global_prompt.replace(/%reservation_code%/g, reservationData.code || "");
    global_prompt = global_prompt.replace(/%arrival_date%/g, formattedArrival);
    global_prompt = global_prompt.replace(/%departure_date%/g, formattedDeparture);
    global_prompt = global_prompt.replace(/%check_in%/g, formattedCheckIn); // Fixed placeholder name
    global_prompt = global_prompt.replace(/%check_out%/g, formattedCheckOut); // Fixed placeholder name
    global_prompt = global_prompt.replace(/%guest_count%/g, reservationData.guests?.total || 0);

    // Property information
    global_prompt = global_prompt.replace(/%property_name%/g, property.name || "");
    global_prompt = global_prompt.replace(/%property_address%/g, property.address?.display || "");

    // Update agent voice if provided
    if (voice_id) {
      await client.agent.update(override_agent_id || "agent_fb2d83280164087b5753f511b6", {
        voice_id: voice_id || "custom_voice_928d333ec977dcdfc656114d21",
      });
    }

    // Update the conversation flow with the populated prompt
    const payload = { global_prompt };
    const updateUrl = `https://api.retellai.com/update-conversation-flow/conversation_flow_248826e3ef82`;

    await axios.post(updateUrl, payload, {
      headers: {
        Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    // Make the phone call
    const phoneCallResponse = await client.call.createPhoneCall({
      from_number: from_number || "+14153587132",
      to_number: to_number,
      override_agent_id: override_agent_id || "agent_fb2d83280164087b5753f511b6",
    });

    // Save call information to database
    await Call.create({
      user_id: property.user?.id || null,
      office_id: req.body.office_id || null,
      retell_key: reservationId,
      call_id: phoneCallResponse?.call_id,
      call_type: phoneCallResponse?.call_type,
      agent_id: phoneCallResponse?.agent_id,
      call_status: phoneCallResponse?.call_status,
      from_number: phoneCallResponse?.from_number,
      to_number: phoneCallResponse?.to_number,
      direction: phoneCallResponse?.direction,
      status: 3,
    });

    // Update reservation system if needed
    try {
      const updatedata = `https://your-api-endpoint.com/api/reservation-call-response`;
      await axios.post(updatedata, {
        call_status: phoneCallResponse?.call_status,
        call_id: phoneCallResponse?.call_id,
        id: reservationId,
      });
    } catch (updateError) {
      console.log("Warning: Could not update reservation system", updateError.message);
      // Continue execution - this is not critical
    }

    res.status(200).json({
      success: true,
      call: phoneCallResponse,
      reservation: reservationData,
    });
  } catch (error) {
    console.error("Error making reservation call:", error);
    res.status(error?.body?.statusCode || error?.response?.status || 500).json({
      error: "Failed to make reservation call",
      message: error.message,
    });
  }
};
/**
 * Fetches a reservation by ID from the Hospitable API
 */
async function getReservationById(reservationId = 'b73fd752-0c54-4bd8-9b9a-a8aa6655b1b5') {
  try {
    const bearerToken = process.env.HOSPITABLE_API_KEY;
    
    if (!bearerToken) {
      throw new Error("Hospitable API key not configured");
    }
    
    const url = `https://public.api.hospitable.com/v2/reservations/${reservationId}?include=guest,user,properties,listings`;
    
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      }
    });
    
    return response.data.data;
  } catch (error) {
    console.error("Error fetching reservation:", error.message);
    throw new Error(`Failed to fetch reservation: ${error.message}`);
  }
}

/**
 * Process completed reservation calls for analysis
 */
exports.reservationCallAnalysisCron = async () => {
  try {
    const client = await getClient();
    
    // Find ended calls that need processing
    const callDetail = await Call.findOne({
      where: { 
        call_status: 'ended', 
        status: 3 
      }
    });
    
    if (!callDetail) {
      console.log("No completed reservation calls to process");
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
      { where: { id: callDetail?.id }}
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
      confirmed: z.boolean().nullable(),
      guest_name: z.string().nullable(),
      arrival_date: z.string().nullable(),
      special_requests: z.string().nullable(),
    });
    
    // Request AI to extract structured details from the transcript
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content: `Read the following conversation between a host and a guest about a reservation.
Analyze the conversation to determine whether the guest has confirmed their reservation details.

Extract the relevant details and return them in JSON format:
- confirmed: Whether the guest confirmed their reservation (true/false)
- guest_name: The name of the guest
- arrival_date: The arrival date mentioned
- special_requests: Any special requests mentioned by the guest

Do NOT fabricate missing data. If a value is not present, return null.`,
        },
        { role: "user", content: callResponses?.transcript },
      ],
      response_format: zodResponseFormat(conversationStruct, "reservation_data"),
    });
    
    // Extract the structured data
    let extractedData = completion.choices?.[0]?.message?.parsed || {};
    
    // Send data to your main system
    const updateData = {
      call_status: callResponses?.call_status,
      summary: callResponses?.call_analysis?.call_summary,
      confirmed: extractedData?.confirmed,
      guest_name: extractedData?.guest_name,
      arrival_date: extractedData?.arrival_date,
      special_requests: extractedData?.special_requests,
      id: callDetail?.retell_key,
      call_id: callDetail?.call_id
    };
    
    // Update reservation data in your system
    const updateDataUrl = `https://your-api-endpoint.com/api/reservation-update`;
    await axios.post(updateDataUrl, updateData);
    
    console.log("Successfully processed completed reservation call:", callDetail?.call_id);
    
  } catch (error) {
    console.error("Error processing completed reservation calls:", error.message);
  }
};