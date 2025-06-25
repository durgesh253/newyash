const getClient = require("./../config/retell");
const axios = require("axios");
const OpenAI = require("openai");
const { db } = require("../models");
const { messaging } = require("firebase-admin");
const Call = db.call;
exports.updateStatus = async () =>{
  try {
    const client = await getClient('');
    const calldetail = await Call.findOne({where: { call_status: ["registered","ongoing"] }});
    if(calldetail){
     
     
      const callResponses = await client.call.retrieve(calldetail?.call_id);
      
      if(callResponses){
        await Call.update(
          { call_status: callResponses?.call_status },
          { where: { id: calldetail?.id },
        });
      }
    }
    
  } catch (error) {
    console.log({message : error?.message})
  }
}

exports.updateNextAction = async () =>{
  try {
    const client = await getClient('');
    const calldetail = await Call.findOne({where: { call_status: 'ended', status : 1 }});
    if(calldetail){
     
     
      const callResponses = await client.call.retrieve(calldetail?.call_id);
      
      if(callResponses){
        await generateNextAction(callResponses?.call_analysis?.call_summary, calldetail?.call_id);
        await Call.update(
          { status : 2 },
          { where: { id: calldetail?.id },
        });
      }
    }
    
  } catch (error) {
    console.log({message : error?.message})
  }
}

exports.getCallList = async (req, res) =>{
    const { id } = req.params;
    try {
        const client = await getClient('');
        let filter_criteria = {};
        filter_criteria.call_successful = [true];
      const callResponses = await client.call.retrieve(id);
      await generateNextAction(callResponses?.transcript, id);
      res.status(200).json({ response: true, data: callResponses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const generateNextAction = async (call_summary, call_id) =>{
  try {
    const apiKey = 'UVjItR2HUMjCyo7q5uwhsmAmghGAGg1Z'; // Replace with your actual API key
    
    const axios = require('axios');

    const options = {
      method: 'POST',
      url: 'https://api.openphone.com/v1/messages',
      headers: {
        'Authorization': 'UVjItR2HUMjCyo7q5uwhsmAmghGAGg1Z', // Replace with your actual API key
        'Content-Type': 'application/json'
      },
      data: {
        content: call_summary,  // Replace with your OpenPhone number ID
        from: '+18882912620', // Replace with the sender info (typically the phone number or OpenPhone ID)
        to: ['+12317585617'], // Replace with the recipient's phone number
        userId: 'US9tu6QNXw', // Replace with the user's ID
        setInboxStatus: 'done'
      }
    };
    
    axios.request(options)
      .then(response => {
        console.log('Message sent:', response.data);
      })
      .catch(error => {
        
        console.error('Error sending message:', error.response?.data || error.message);
      });
    
  } catch (error) {
    console.log(error)
    console.error('Failed to send message:', error.message);
  }
}

exports.getCallByTypes = async (req, res) =>{
  //const calldetail = await Call.findOne({where: { call_status: 'ended', status : 1 }});
  try {
    const { type } = req.params;
    const calls = await Call.findAll(
      // {where: { call_use: type }}
    );
    return res.status(200).json({ response: true, data: calls });
  } catch (error) {
    res.status(500).json({error : error?.message})
  }
}



exports.deleteCallById = async (req, res) =>{
  //const calldetail = await Call.findOne({where: { call_status: 'ended', status : 1 }});
  try {
    const { id } = req.params;
    const clientRetell = await getClient('');
    await Call.destroy({
      where: {
        call_id: id,
      },
    });
    const deleteResponse = await clientRetell.call.delete(id);
    return res.status(200).json({ response: true, data: deleteResponse });
  } catch (error) {
    res.status(500).json({error : error?.message})
  }
}