
// // controllers/reservationController.js
// const getClient = require("../config/retell");
// const axios = require("axios");
// const { db } = require("../models");
// const Call = db.call;
// const moment = require("moment");
// require('dotenv').config();

// // controllers/reservationController.js (updated prompt replacement section)
// exports.makeInquiryCall = async (req, res) => {
//   try {
//     const {
//       from_number,
//       to_number,
//       inquiryId,
//       override_agent_id,
//       voice_id,
//     } = req.body;

//     // Validate required fields
//     if (!to_number) {
//       return res.status(400).json({ error: "Recipient phone number is required" });
//     }
//     if (!inquiryId) {
//       return res.status(400).json({ error: "Inquiry ID is required" });
//     }

//     // Initialize Retell client
//     const client = await getClient();

//     // Get current UTC time
//     const utcMoment = moment.utc();
//     const currentTime = utcMoment.format();

//     // Fetch inquiry data
//     const inquiryData = await getInquiryById(inquiryId);
//     if (!inquiryData) {
//       return res.status(404).json({ error: "Inquiry not found" });
//     }

//     // Extract property and guest data
//     const property = inquiryData.properties || {};
//     const guest = inquiryData.guest || {};

//     // Format dates
//     const formattedArrival = moment(inquiryData.arrival_date).format("MMMM D, YYYY");
//     const formattedDeparture = moment(inquiryData.departure_date).format("MMMM D, YYYY");
//     const formattedInquiryDate = moment(inquiryData.inquiry_date).format("MMMM D, YYYY");

//     // Check if inquiry_global_prompt is defined
//     const { inquiry_global_prompt } = require("../constant/index");
//     if (!inquiry_global_prompt) {
//       console.error("inquiry_global_prompt is undefined");
//       return res.status(500).json({ error: "Internal server error: Prompt configuration missing" });
//     }

//     // Replace placeholders in the global prompt template
//     let global_prompt = inquiry_global_prompt;

//     // Current date/time
//     global_prompt = global_prompt.replace(/%current_datetime%/g, currentTime);

//     // Inquiry information
//     global_prompt = global_prompt.replace(/%inquiry_id%/g, inquiryData.id || "");
//     global_prompt = global_prompt.replace(/%inquiry_date%/g, formattedInquiryDate);
//     global_prompt = global_prompt.replace(/%platform%/g, inquiryData.platform || "unknown");
//     global_prompt = global_prompt.replace(/%arrival_date%/g, formattedArrival);
//     global_prompt = global_prompt.replace(/%departure_date%/g, formattedDeparture);
//     global_prompt = global_prompt.replace(/%guest_count%/g, inquiryData.guests?.total || 0);
//     global_prompt = global_prompt.replace(/%adult_count%/g, inquiryData.guests?.adult_count || 0);
//     global_prompt = global_prompt.replace(/%child_count%/g, inquiryData.guests?.child_count || 0);
//     global_prompt = global_prompt.replace(/%infant_count%/g, inquiryData.guests?.infant_count || 0);

//     // Guest information
//     global_prompt = global_prompt.replace(/%guest_name%/g, `${guest.first_name || ''} ${guest.last_name || ''}`.trim());
//     global_prompt = global_prompt.replace(/%guest_language%/g, guest.language || "English");

//     // Property information
//     global_prompt = global_prompt.replace(/%property_name%/g, property.name || "");
//     global_prompt = global_prompt.replace(/%property_public_name%/g, property.public_name || "");
//     global_prompt = global_prompt.replace(/%property_address%/g, property.address?.display || "");
//     global_prompt = global_prompt.replace(/%property_timezone%/g, property.timezone || "");
//     global_prompt = global_prompt.replace(/%property_currency%/g, property.currency || "");
//     global_prompt = global_prompt.replace(/%property_listed%/g, property.listed ? "true" : "false");
//     global_prompt = global_prompt.replace(/%property_type%/g, property.property_type || "");
//     global_prompt = global_prompt.replace(/%property_room_type%/g, property.room_type || "");
//     global_prompt = global_prompt.replace(/%property_checkin%/g, property.checkin ? moment(property.checkin, "HH:mm").format("h:mm A") : "");
//     global_prompt = global_prompt.replace(/%property_checkout%/g, property.checkout ? moment(property.checkout, "HH:mm").format("h:mm A") : "");
//     global_prompt = global_prompt.replace(/%property_capacity_max%/g, property.capacity?.max || 0);
//     global_prompt = global_prompt.replace(/%property_bedrooms%/g, property.capacity?.bedrooms || 0);
//     global_prompt = global_prompt.replace(/%property_beds%/g, property.capacity?.beds || 0);
//     global_prompt = global_prompt.replace(/%property_bathrooms%/g, property.capacity?.bathrooms || 0);
//     global_prompt = global_prompt.replace(/%property_amenities%/g, property.amenities?.join(", ") || "");
//     global_prompt = global_prompt.replace(/%property_pets_allowed%/g, property.house_rules?.pets_allowed ? "allowed" : "not allowed");
//     global_prompt = global_prompt.replace(/%property_smoking_allowed%/g, property.house_rules?.smoking_allowed ? "allowed" : "not allowed");
//     global_prompt = global_prompt.replace(/%property_events_allowed%/g, property.house_rules?.events_allowed ? "allowed" : "not allowed");
//     global_prompt = global_prompt.replace(/%host_name%/g, property.user?.name || "");
//     global_prompt = global_prompt.replace(/%host_email%/g, property.user?.email || "");
//     global_prompt = global_prompt.replace(/%property_listings%/g, property.listings?.map(l => l.platform).join(", ") || "");

//     // Room details
//     const roomDetails = property.room_details || [];
//     global_prompt = global_prompt.replace(/%room_1_beds%/g, roomDetails[0]?.beds.map(b => `${b.quantity} ${b.type.replace('_bed', '')}`).join(", ") || "");
//     global_prompt = global_prompt.replace(/%room_2_beds%/g, roomDetails[1]?.beds.map(b => `${b.quantity} ${b.type.replace('_bed', '')}`).join(", ") || "");
//     global_prompt = global_prompt.replace(/%room_3_beds%/g, roomDetails[2]?.beds.map(b => `${b.quantity} ${b.type.replace('_bed', '')}`).join(", ") || "");
//     global_prompt = global_prompt.replace(/%room_4_beds%/g, roomDetails[3]?.beds.map(b => `${b.quantity} ${b.type.replace('_bed', '')}`).join(", ") || "");
//     global_prompt = global_prompt.replace(/%room_5_beds%/g, roomDetails[4]?.beds.map(b => `${b.quantity} ${b.type.replace('_bed', '')}`).join(", ") || "");

//     // Update agent voice if provided
//     if (voice_id) {
//       await client.agent.update(override_agent_id || "agent_fb2d83280164087b5753f511b6", {
//         voice_id: voice_id || "custom_voice_928d333ec977dcdfc656114d21",
//       });
//     }

//     // Update the conversation flow with the populated prompt
//     const payload = { global_prompt };
//     const updateUrl = `https://api.retellai.com/update-conversation-flow/conversation_flow_248826e3ef82`;

//     await axios.post(updateUrl, payload, {
//       headers: {
//         Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//     });

//     // Make the phone call
//     const phoneCallResponse = await client.call.createPhoneCall({
//       from_number: from_number || "+14153587132",
//       to_number: to_number,
//       override_agent_id: override_agent_id || "agent_fb2d83280164087b5753f511b6",
//     });

//     // Save call information to database
//     await Call.create({
//       user_id: property.user?.id || null,
//       office_id: req.body.office_id || null,
//       retell_key: inquiryId,
//       call_id: phoneCallResponse?.call_id,
//       call_type: phoneCallResponse?.call_type,
//       agent_id: phoneCallResponse?.agent_id,
//       call_status: phoneCallResponse?.call_status,
//       from_number: phoneCallResponse?.from_number,
//       to_number: phoneCallResponse?.to_number,
//       direction: phoneCallResponse?.direction,
//       status: 3,
//     });

//     // Update inquiry system if needed
//     try {
//       const updatedata = `https://your-api-endpoint.com/api/inquiry-call-response`;
//       await axios.post(updatedata, {
//         call_status: phoneCallResponse?.call_status,
//         call_id: phoneCallResponse?.call_id,
//         id: inquiryId,
//       });
//     } catch (updateError) {
//       console.log("Warning: Could not update inquiry system", updateError.message);
//       // Continue execution - this is not critical
//     }

//     res.status(200).json({
//       success: true,
//       call: phoneCallResponse,
//       inquiry: inquiryData,
//     });
//   } catch (error) {
//     console.error("Error making inquiry call:", error);
//     res.status(error?.body?.statusCode || error?.response?.status || 500).json({
//       error: "Failed to make inquiry call",
//       message: error.message,
//     });
//   }
// };

// async function getInquiryById(inquiryId = '83b50736-699b-4b83-8b00-f8ddbe006446') {
//     try {
//       const bearerToken = process.env.HOSPITABLE_API_KEY;
      
//       if (!bearerToken) {
//         throw new Error("Hospitable API key not configured");
//       }
      
//       const url = `https://public.api.hospitable.com/v2/inquiries/${inquiryId}?include=guest,user,properties,listings`;
      
//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${bearerToken}`,
//           "Content-Type": "application/json",
//         }
//       });
      
//       return response.data.data;
//     } catch (error) {
//       console.error("Error fetching inquiry:", error.message);
//       throw new Error(`Failed to fetch inquiry: ${error.message}`);
//     }
//   }
  


// /**
// * Process completed inquiry calls for analysis
// */
// exports.inquiryCallAnalysisCron = async () => {
//   try {
//     const client = await getClient();
    
//     // Find ended calls that need processing
//     const callDetail = await Call.findOne({
//       where: { 
//         call_status: 'ended', 
//         status: 3 
//       }
//     });
    
//     if (!callDetail) {
//       console.log("No completed inquiry calls to process");
//       return;
//     }
    
//     // Get call details from Retell
//     const callResponses = await client.call.retrieve(callDetail?.call_id);
    
//     if (!callResponses) {
//       console.log("No call responses available");
//       return;
//     }
    
//     // Update call status
//     await Call.update(
//       { status: 2 },
//       { where: { id: callDetail?.id }}
//     );
    
//     // Extract data from transcript
//     const OpenAI = require("openai");
//     const { z } = require("zod");
//     const { zodResponseFormat } = require("openai/helpers/zod");
    
//     const openai = new OpenAI({
//       apiKey: process.env.OPENAI_APIKEY,
//     });
    
//     // Define the expected structure for extracted data
//     const conversationStruct = z.object({
//       interested: z.boolean().nullable(),
//       guest_name: z.string().nullable(),
//       arrival_date: z.string().nullable(),
//       special_requests: z.string().nullable(),
//     });
    
//     // Request AI to extract structured details from the transcript
//     const completion = await openai.beta.chat.completions.parse({
//       model: "gpt-4o-2024-08-06",
//       messages: [
//         {
//           role: "system",
//           content: `Read the following conversation between a host and a guest about an inquiry.
// Analyze the conversation to determine whether the guest is still interested in booking.

// Extract the relevant details and return them in JSON format:
// - interested: Whether the guest confirmed interest in booking (true/false)
// - guest_name: The name of the guest
// - arrival_date: The arrival date mentioned
// - special_requests: Any special requests mentioned by the guest

// Do NOT fabricate missing data. If a value is not present, return null.`,
//         },
//         { role: "user", content: callResponses?.transcript },
//       ],
//       response_format: zodResponseFormat(conversationStruct, "inquiry_data"),
//     });
    
//     // Extract the structured data
//     let extractedData = completion.choices?.[0]?.message?.parsed || {};
    
//     // Send data to your main system
//     const updateData = {
//       call_status: callResponses?.call_status,
//       summary: callResponses?.call_analysis?.call_summary,
//       interested: extractedData?.interested,
//       guest_name: extractedData?.guest_name,
//       arrival_date: extractedData?.arrival_date,
//       special_requests: extractedData?.special_requests,
//       id: callDetail?.retell_key,
//       call_id: callDetail?.call_id
//     };
    
//     // Update inquiry data in your system
//     const updateDataUrl = `https://your-api-endpoint.com/api/inquiry-update`;
//     await axios.post(updateDataUrl, updateData);
    
//     console.log("Successfully processed completed inquiry call:", callDetail?.call_id);
    
//   } catch (error) {
//     console.error("Error processing completed inquiry calls:", error.message);
//   }
// };


// controllers/inquiryController.js
const getClient = require("../config/retell");
const axios = require("axios");
const { db } = require("../models");
const Call = db.call;
const moment = require("moment");
const { inquiry_global_prompt } = require("../constant/index");
require('dotenv').config();

/**
 * Fetches all properties from the Hospitable API to get property UUIDs
 */
async function getAllProperties() {
  try {
    const bearerToken = process.env.HOSPITABLE_API_KEY;

    if (!bearerToken) {
      throw new Error("Hospitable API key not configured");
    }

    let allProperties = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const url = `https://public.api.hospitable.com/v2/properties?page=${page}&per_page=${perPage}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
      });

      const properties = response.data.data;
      allProperties = allProperties.concat(properties);

      if (!response.data.links.next) {
        break; // No more pages
      }

      page++;
    }

    return allProperties.map((property) => property.id); // Return array of property UUIDs
  } catch (error) {
    console.error("Error fetching properties:", error.message);
    throw new Error(`Failed to fetch properties: ${error.message}`);
  }
}

/**
 * Fetches all inquiries from the Hospitable API
 */
async function getAllInquiries(options = {}) {
  try {
    const bearerToken = process.env.HOSPITABLE_API_KEY;

    if (!bearerToken) {
      throw new Error("Hospitable API key not configured");
    }

    // Fetch property UUIDs
    const propertyIds = await getAllProperties();
    if (!propertyIds.length) {
      throw new Error("No properties found");
    }

    let allInquiries = [];
    let page = 1;
    const perPage = 100; // Max allowed by API

    // Default query parameters
    const queryParams = {
      properties: propertyIds,
      include: "guest,properties,user,listings", // Include relevant data
      page,
      per_page: perPage,
      ...options, // Allow overriding with custom options (e.g., start_date, end_date)
    };

    while (true) {
      const queryString = new URLSearchParams();
      queryString.append("include", queryParams.include);
      queryString.append("page", queryParams.page);
      queryString.append("per_page", queryParams.per_page);
      queryParams.properties.forEach((id) => queryString.append("properties[]", id));
      if (queryParams.start_date) queryString.append("start_date", queryParams.start_date);
      if (queryParams.end_date) queryString.append("end_date", queryParams.end_date);

      const url = `https://public.api.hospitable.com/v2/inquiries?${queryString.toString()}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
      });

      const inquiries = response.data.data;
      allInquiries = allInquiries.concat(inquiries);

      if (!response.data.links.next) {
        break; // No more pages
      }

      page++;
      queryParams.page = page;
    }

    return allInquiries;
  } catch (error) {
    console.error("Error fetching all inquiries:", error.message);
    throw new Error(`Failed to fetch inquiries: ${error.message}`);
  }
}

/**
 * Fetches an inquiry by ID from the Hospitable API
 */
async function getInquiryById(inquiryId) {
  try {
    const bearerToken = process.env.HOSPITABLE_API_KEY;

    if (!bearerToken) {
      throw new Error("Hospitable API key not configured");
    }

    const url = `https://public.api.hospitable.com/v2/inquiries/${inquiryId}?include=guest,user,properties,listings`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching inquiry ${inquiryId}:`, error.message);
    throw new Error(`Failed to fetch inquiry: ${error.message}`);
  }
}

/**
 * Get all inquiries
 */
exports.getAllInquiries = async (req, res) => {
  try {
    // Allow query parameters to customize the request
    const options = {
      start_date: req.query.start_date,
      end_date: req.query.end_date,
    };

    const inquiries = await getAllInquiries(options);
    res.status(200).json({
      success: true,
      data: inquiries,
    });
  } catch (error) {
    console.error("Error fetching all inquiries:", error.message);
    res.status(400).json({
      error: "Failed to fetch inquiries",
      message: error.message,
    });
  }
};

/**
 * Makes a call to a customer for an inquiry
 */
exports.makeInquiryCall = async (req, res) => {
  try {
    const {
      from_number,
      to_number,
      inquiryId,
      override_agent_id,
      voice_id,
    } = req.body;

    // Validate required fields
    if (!to_number) {
      return res.status(400).json({ error: "Recipient phone number is required" });
    }
    if (!inquiryId) {
      return res.status(400).json({ error: "Inquiry ID is required" });
    }

    // Initialize Retell client
    const client = await getClient();

    // Get current UTC time
    const utcMoment = moment.utc();
    const currentTime = utcMoment.format();

    // Fetch inquiry data
    const inquiryData = await getInquiryById(inquiryId);
    if (!inquiryData) {
      return res.status(404).json({ error: "Inquiry not found" });
    }

    // Extract property and guest data
    const property = inquiryData.properties?.[0] || {};
    const guest = inquiryData.guest || {};

    // Format dates
    const formattedArrival = moment(inquiryData.arrival_date).format("MMMM D, YYYY");
    const formattedDeparture = moment(inquiryData.departure_date).format("MMMM D, YYYY");
    const formattedInquiryDate = moment(inquiryData.inquiry_date).format("MMMM D, YYYY");

    // Check if inquiry_global_prompt is defined
    if (!inquiry_global_prompt) {
      console.error("inquiry_global_prompt is undefined");
      return res.status(500).json({ error: "Internal server error: Prompt configuration missing" });
    }

    // Replace placeholders in the global prompt template
    let global_prompt = inquiry_global_prompt;

    // Current date/time
    global_prompt = global_prompt.replace(/%current_datetime%/g, currentTime);

    // Inquiry information
    global_prompt = global_prompt.replace(/%inquiry_id%/g, inquiryData.id || "");
    global_prompt = global_prompt.replace(/%inquiry_date%/g, formattedInquiryDate);
    global_prompt = global_prompt.replace(/%platform%/g, inquiryData.platform || "unknown");
    global_prompt = global_prompt.replace(/%arrival_date%/g, formattedArrival);
    global_prompt = global_prompt.replace(/%departure_date%/g, formattedDeparture);
    global_prompt = global_prompt.replace(/%guest_count%/g, inquiryData.guests?.total || 0);
    global_prompt = global_prompt.replace(/%adult_count%/g, inquiryData.guests?.adult_count || 0);
    global_prompt = global_prompt.replace(/%child_count%/g, inquiryData.guests?.child_count || 0);
    global_prompt = global_prompt.replace(/%infant_count%/g, inquiryData.guests?.infant_count || 0);

    // Guest information
    global_prompt = global_prompt.replace(/%guest_name%/g, `${guest.first_name || ''} ${guest.last_name || ''}`.trim());
    global_prompt = global_prompt.replace(/%guest_language%/g, guest.language || "English");

    // Property information
    global_prompt = global_prompt.replace(/%property_name%/g, property.name || "");
    global_prompt = global_prompt.replace(/%property_public_name%/g, property.public_name || "");
    global_prompt = global_prompt.replace(/%property_address%/g, property.address?.display || "");
    global_prompt = global_prompt.replace(/%property_timezone%/g, property.timezone || "");
    global_prompt = global_prompt.replace(/%property_currency%/g, property.currency || "");
    global_prompt = global_prompt.replace(/%property_listed%/g, property.listed ? "true" : "false");
    global_prompt = global_prompt.replace(/%property_type%/g, property.property_type || "");
    global_prompt = global_prompt.replace(/%property_room_type%/g, property.room_type || "");
    global_prompt = global_prompt.replace(/%property_checkin%/g, property.checkin ? moment(property.checkin, "HH:mm").format("h:mm A") : "");
    global_prompt = global_prompt.replace(/%property_checkout%/g, property.checkout ? moment(property.checkout, "HH:mm").format("h:mm A") : "");
    global_prompt = global_prompt.replace(/%property_capacity_max%/g, property.capacity?.max || 0);
    global_prompt = global_prompt.replace(/%property_bedrooms%/g, property.capacity?.bedrooms || 0);
    global_prompt = global_prompt.replace(/%property_beds%/g, property.capacity?.beds || 0);
    global_prompt = global_prompt.replace(/%property_bathrooms%/g, property.capacity?.bathrooms || 0);
    global_prompt = global_prompt.replace(/%property_amenities%/g, property.amenities?.join(", ") || "");
    global_prompt = global_prompt.replace(/%property_pets_allowed%/g, property.house_rules?.pets_allowed ? "allowed" : "not allowed");
    global_prompt = global_prompt.replace(/%property_smoking_allowed%/g, property.house_rules?.smoking_allowed ? "allowed" : "not allowed");
    global_prompt = global_prompt.replace(/%property_events_allowed%/g, property.house_rules?.events_allowed ? "allowed" : "not allowed");
    global_prompt = global_prompt.replace(/%host_name%/g, property.user?.name || "");
    global_prompt = global_prompt.replace(/%host_email%/g, property.user?.email || "");
    global_prompt = global_prompt.replace(/%property_listings%/g, property.listings?.map(l => l.platform).join(", ") || "");

    // Room details
    const roomDetails = property.room_details || [];
    global_prompt = global_prompt.replace(/%room_1_beds%/g, roomDetails[0]?.beds.map(b => `${b.quantity} ${b.type.replace('_bed', '')}`).join(", ") || "");
    global_prompt = global_prompt.replace(/%room_2_beds%/g, roomDetails[1]?.beds.map(b => `${b.quantity} ${b.type.replace('_bed', '')}`).join(", ") || "");
    global_prompt = global_prompt.replace(/%room_3_beds%/g, roomDetails[2]?.beds.map(b => `${b.quantity} ${b.type.replace('_bed', '')}`).join(", ") || "");
    global_prompt = global_prompt.replace(/%room_4_beds%/g, roomDetails[3]?.beds.map(b => `${b.quantity} ${b.type.replace('_bed', '')}`).join(", ") || "");
    global_prompt = global_prompt.replace(/%room_5_beds%/g, roomDetails[4]?.beds.map(b => `${b.quantity} ${b.type.replace('_bed', '')}`).join(", ") || "");

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

    // Save call-information to database
    await Call.create({
      user_id: property.user?.id || null,
      office_id: req.body.office_id || null,
      retell_key: inquiryId,
      call_id: phoneCallResponse?.call_id,
      call_type: phoneCallResponse?.call_type,
      agent_id: phoneCallResponse?.agent_id,
      call_status: phoneCallResponse?.call_status,
      from_number: phoneCallResponse?.from_number,
      to_number: phoneCallResponse?.to_number,
      direction: phoneCallResponse?.direction,
      status: 3,
    });

    // Update inquiry system if needed
    try {
      const updatedata = `https://your-api-endpoint.com/api/inquiry-call-response`;
      await axios.post(updatedata, {
        call_status: phoneCallResponse?.call_status,
        call_id: phoneCallResponse?.call_id,
        id: inquiryId,
      });
    } catch (updateError) {
      console.log("Warning: Could not update inquiry system", updateError.message);
      // Continue execution - this is not critical
    }

    res.status(200).json({
      success: true,
      call: phoneCallResponse,
      inquiry: inquiryData,
    });
  } catch (error) {
    console.error("Error making inquiry call:", error);
    res.status(error?.response?.status || 500).json({
      error: "Failed to make inquiry call",
      message: error.message,
    });
  }
};

/**
 * Process completed inquiry calls for analysis
 */
exports.inquiryCallAnalysisCron = async () => {
  try {
    const client = await getClient();

    // Find ended calls that need processing
    const callDetail = await Call.findOne({
      where: {
        call_status: 'ended',
        status: 3,
      },
    });

    if (!callDetail) {
      console.log("No completed inquiry calls to process");
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
          content: `Read the following conversation between a host and a guest about an inquiry.
Analyze the conversation to determine whether the guest is still interested in booking.

Extract the relevant details and return them in JSON format:
- interested: Whether the guest confirmed interest in booking (true/false)
- guest_name: The name of the guest
- arrival_date: The arrival date mentioned
- special_requests: Any special requests mentioned by the guest

Do NOT fabricate missing data. If a value is not present, return null.`,
        },
        { role: "user", content: callResponses?.transcript },
      ],
      response_format: zodResponseFormat(conversationStruct, "inquiry_data"),
    });

    // Extract the structured data
    let extractedData = completion.choices?.[0]?.message?.parsed || {};

    // Send data to your main system
    const updateData = {
      call_status: callResponses?.call_status,
      summary: callResponses?.call_analysis?.call_summary,
      interested: extractedData?.interested,
      guest_name: extractedData?.guest_name,
      arrival_date: extractedData?.arrival_date,
      special_requests: extractedData?.special_requests,
      id: callDetail?.retell_key,
      call_id: callDetail?.call_id,
    };

    // Update inquiry data in your system
    const updateDataUrl = `https://your-api-endpoint.com/api/inquiry-update`;
    await axios.post(updateDataUrl, updateData);

    console.log("Successfully processed completed inquiry call:", callDetail?.call_id);
  } catch (error) {
    console.error("Error processing completed inquiry calls:", error.message);
  }
};