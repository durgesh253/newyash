const { messaging } = require("firebase-admin");
const { db } = require("../models");
const Call = db.call;
const Contact = db.contact;
const getClient = require("./../config/retell");
const axios = require("axios");
exports.createContact = async (req, res) =>{
  try {
    const result = await Contact.findOne({ where: { phone: req.body.phone } });
    if(!result){
      const contactRes = await Contact.create(req.body);
      res.status(201).json({ response: true, data: contactRes, message : "Contact Create Successfully." });
    }else{
      res.status(208).json({ error : "Contact Already Exist!" });
    }
   
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.updateContact = async (req, res) =>{
  try {
    const { id } = req.params;
    const {first_name, last_name, phone} = req.body;
   
    const contactRes = await Contact.update({ 
      first_name : first_name,
      last_name : last_name,
      phone : phone
      },{ where: { id: id } });
      res.status(200).json({ response: true, data: contactRes, message : "Contact Update Successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.deleteContact = async (req, res) =>{
  try {
    const { id } = req.params;
    const contactRes = await Contact.destroy({ where: { id: id } });
    res.status(200).json({ response: true, data: contactRes, message : "Contact Delete Successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.contactList = async (req, res) =>{
  try {
    const contacts = await Contact.findAll();
    res.status(200).json({ response: true, data: contacts, message : "Get contact list Successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.list = async (req, res) => {
  try {
    let token = req.headers["authtoken"] || "";
    const client = await getClient(token);
    const callResponses = await client.call.list();
    res.status(200).json({ response: true, data: callResponses });
  } catch (error) {
    console.error("Main webhook error:", error); // Log the main error
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
};
exports.getCallById = async (req, res) => {
  const { id } = req.params;
  try {
    let token = req.headers["authtoken"] || "";
    const client = await getClient(token);
    const callResponses = await client.call.retrieve(id);
    res.status(200).json({ response: true, data: callResponses });
  } catch (error) {
    console.error("Main webhook error:", error); // Log the main error
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
};

exports.phoneList = async (req, res) => {
  try {
    let token = req.headers["authtoken"] || "";
    const client = await getClient(token);
    const callResponses = await client.phoneNumber.list();
    res.status(200).json({ response: true, data: callResponses });
  } catch (error) {
    console.error("Main webhook error:", error); // Log the main error
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
};
exports.getPhoneById = async (req, res) => {
  const { id } = req.params;
  try {
    let token = req.headers["authtoken"] || "";
    const client = await getClient(token);
    const callResponses = await client.phoneNumber.retrieve(id);
    res.status(200).json({ response: true, data: callResponses });
  } catch (error) {
    console.error("Main webhook error:", error); // Log the main error
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
};
exports.makeCall = async (req, res) => {
  const { from_number, to_number, override_agent_id } = req.body;
  let userid = req.headers["userid"] || "";
  try {
    let token = req.headers["authtoken"] || "";
    const client = await getClient(token);
    const phoneCallResponse = await client.call.createPhoneCall({
      from_number: from_number,
      to_number: to_number,
      override_agent_id: override_agent_id,
    });

    Call.create({
      user_id: userid,
      call_id: phoneCallResponse?.call_id,
      call_type: phoneCallResponse?.call_type,
      agent_id: phoneCallResponse?.agent_id,
      call_status: phoneCallResponse?.call_status,
      from_number: phoneCallResponse?.from_number,
      to_number: phoneCallResponse?.to_number,
      direction: phoneCallResponse?.direction,
    });
    
    res.status(200).json({ response: true, data: phoneCallResponse });
  } catch (error) {
    console.error("Main webhook error:", error); // Log the main error
    res
      .status(error?.body?.statusCode || 500)
      .json({ message: error?.response?.data?.message });
  }
};

exports.importNumber = async (req, res) => {
  const {
    phone_number,
    termination_uri,
    sip_trunk_auth_username,
    sip_trunk_auth_password,
    nickname,
  } = req.body;
  try {
    let token = req.headers["authtoken"] || "";
    const client = await getClient('');
    const phoneNumberResponse = await client.phoneNumber.import({
      phone_number: phone_number,
      termination_uri: termination_uri,
      sip_trunk_auth_username: sip_trunk_auth_username,
      sip_trunk_auth_password: sip_trunk_auth_password,
      nickname: nickname,
    });
    
    res.status(200).json({ response: true, data: phoneNumberResponse });
  } catch (error) {
    console.error("Main webhook error:", error); // Log the main error
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
};

exports.makeWebCall = async (req, res) => {
  const { agent_id, metadata, retell_llm_dynamic_variables, retToken } =
    req.body;
  let token = req.headers["authtoken"] || "";
  // Prepare the payload for the API request
  const payload = { agent_id };

  // Conditionally add optional fields if they are provided
  if (metadata) {
    payload.metadata = metadata;
  }

  if (retell_llm_dynamic_variables) {
    payload.retell_llm_dynamic_variables = retell_llm_dynamic_variables;
  }

  try {
    const response = await axios.post(
      "https://api.retellai.com/v2/create-web-call",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(201).json(response.data);
  } catch (error) {
    console.log({ message: error?.message });
    res
      .status(error?.body?.statusCode || 500)
      .json({ message: error?.response?.data?.message });
  }
};
