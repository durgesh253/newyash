const getClient = require("./../config/retell");
const { resume_global_prompt } = require("../constant/index");
const OpenAI = require("openai");
const axios = require("axios");
const { db } = require("../models");
const Call = db.call;
const { z } = require("zod");
const { zodResponseFormat } = require("openai/helpers/zod");
const moment = require("moment");
exports.makecallresum = async (req, res) =>{
    try {
        const {candidate_name, candidate_email, candidate_phone, your_name, job_type, job_title, company_name,minimum_experience,
            qualification, company_email, company_contact, job_description
         } = req.body;
        const client = await getClient();
         let global_prompt = resume_global_prompt;
             global_prompt = global_prompt.replace("%candidate_name%", candidate_name);
             global_prompt = global_prompt.replace("%candidate_email%", candidate_email);
             global_prompt = global_prompt.replace("%candidate_phone%", candidate_phone);
             global_prompt = global_prompt.replace("%Your_Name%", your_name);
             global_prompt = global_prompt.replace("%job_type%", job_type);
             global_prompt = global_prompt.replace("%job_title%", job_title);
             global_prompt = global_prompt.replace("%company_name%", company_name);
             global_prompt = global_prompt.replace("%minimum_experience%", minimum_experience);
             global_prompt = global_prompt.replace("%qualification%", qualification);
             global_prompt = global_prompt.replace("%company_email%", company_email);
             global_prompt = global_prompt.replace("%company_contact%", company_contact);
             global_prompt = global_prompt.replace("%job_description%", job_description);

        const payload = {};
        payload.global_prompt = global_prompt
        const updateUrl = `https://api.retellai.com/update-conversation-flow/conversation_flow_166ded6c95e4`;
        const upadetRes = await axios.post(updateUrl,
              payload,
              {
                headers: {
                  Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
                  "Content-Type": "application/json",
                },
              }
            );
        
            const phoneCallResponse = await client.call.createPhoneCall({
              from_number: '+14153587132',
              to_number: candidate_phone,
              override_agent_id: 'agent_2c391b21faad439fcd4aa1d8a4',
            });
            Call.create({
                user_id: 2,
                call_id: phoneCallResponse?.call_id,
                call_type: phoneCallResponse?.call_type,
                agent_id: phoneCallResponse?.agent_id,
                call_status: phoneCallResponse?.call_status,
                from_number: phoneCallResponse?.from_number,
                to_number: phoneCallResponse?.to_number,
                direction: phoneCallResponse?.direction,
              });
         
        res.status(200).json({ response: true, call: phoneCallResponse });
    } catch (error) {
        console.log({error});
        res.status(error?.body?.statusCode || 500).json({ message: error?.response?.data?.message });  
    }
}
exports.makecall = async (req, res) =>{
  try {

    const {
      candidate_name,
      candidate_email,
      refered_by,
      caller_name,
      description,
      requirements,
      office_id,
      candidate_id,
      callhistory_id,
      candidate_phone,
      voice_id
   } = req.body;
    var utcMoment = moment.utc();
      let currentTime = utcMoment.format();
        
      const client = await getClient();
        const to_number = "+"+candidate_phone;

        let global_prompt = resume_global_prompt;
        global_prompt = global_prompt.replace("%current_datetime%", currentTime);

        global_prompt = global_prompt.replace("%candidate_name%", candidate_name);
        global_prompt = global_prompt.replace("%candidate_email%", candidate_email);
        global_prompt = global_prompt.replace("%candidate_phone%", to_number);
        global_prompt = global_prompt.replace("%reference_by%", refered_by);

        global_prompt = global_prompt.replace("%Your_Name%", caller_name);
        global_prompt = global_prompt.replace("%job_details%",description );
        global_prompt = global_prompt.replace("%job_requirement%", requirements);

        const agentResponse = await client.agent.update('agent_2c391b21faad439fcd4aa1d8a4', {
          voice_id: voice_id || "custom_voice_928d333ec977dcdfc656114d21"
        });

        const payload = {};
        payload.global_prompt = global_prompt
        const updateUrl = `https://api.retellai.com/update-conversation-flow/conversation_flow_166ded6c95e4`;
        const upadetRes = await axios.post(updateUrl,
              payload,
              {
                headers: {
                  Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
                  "Content-Type": "application/json",
                },
              }
            );
        
            const phoneCallResponse = await client.call.createPhoneCall({
              from_number: '+14153587132',
              to_number: to_number,
              override_agent_id: 'agent_2c391b21faad439fcd4aa1d8a4',
            });
            Call.create({
                user_id: candidate_id,
                office_id: office_id,
                retell_key: callhistory_id,
                call_id: phoneCallResponse?.call_id,
                call_type: phoneCallResponse?.call_type,
                agent_id: phoneCallResponse?.agent_id,
                call_status: phoneCallResponse?.call_status,
                from_number: phoneCallResponse?.from_number,
                to_number: phoneCallResponse?.to_number,
                direction: phoneCallResponse?.direction,
                status : 3
              });
         
              const updatedata = `https://staging-login.nurtureme.ai/api/call-response`;
               const resUpdate = await axios.post(updatedata,
                {
                  call_status : phoneCallResponse?.call_status,
                  call_id : phoneCallResponse?.call_id,
                  id : callhistory_id
                }
              );
              res.status(200).json({ response: true, call: phoneCallResponse });
  } catch (error) {
    console.log(error);
    res.status(error?.body?.statusCode || 500).json({ message: error?.response?.data?.message });
  }

}
exports.makecallCron = async () =>{
  try {
    const upadetRes = await axios.get('https://staging-login.nurtureme.ai/api/call-cron');
    const data  = upadetRes?.data;
    const client = await getClient();
    if(data?.success){

      var utcMoment = moment.utc();
      let currentTime = utcMoment.format();
        console.log(data?.success)
        const interviewdata = data?.job_data;
        const callerdata = data?.call;
        const candidate = data?.candidate;
        const user = data?.user;
        const setup = data?.setup;

        const to_number = "+"+candidate?.number;

        let global_prompt = resume_global_prompt;
        global_prompt = global_prompt.replace("%current_datetime%", currentTime);

        global_prompt = global_prompt.replace("%candidate_name%", candidate?.display_name);
        global_prompt = global_prompt.replace("%candidate_email%", candidate?.email);
        global_prompt = global_prompt.replace("%candidate_phone%", candidate?.number);
        global_prompt = global_prompt.replace("%reference_by%", user?.first_name+" "+user?.last_name);

        global_prompt = global_prompt.replace("%Your_Name%", interviewdata?.call_name);
        global_prompt = global_prompt.replace("%job_details%", interviewdata?.description );
        global_prompt = global_prompt.replace("%job_requirement%", interviewdata?.requirements);

        const agentResponse = await client.agent.update('agent_2c391b21faad439fcd4aa1d8a4', {
          voice_id: setup?.voice_id || "custom_voice_928d333ec977dcdfc656114d21"
        });

        const payload = {};
        payload.global_prompt = global_prompt
        const updateUrl = `https://api.retellai.com/update-conversation-flow/conversation_flow_166ded6c95e4`;
        const upadetRes = await axios.post(updateUrl,
              payload,
              {
                headers: {
                  Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
                  "Content-Type": "application/json",
                },
              }
            );
        
            const phoneCallResponse = await client.call.createPhoneCall({
              from_number: '+14153587132',
              to_number: to_number,
              override_agent_id: 'agent_2c391b21faad439fcd4aa1d8a4',
            });
            Call.create({
                user_id: candidate?.id,
                office_id: candidate?.office_id,
                retell_key: callerdata?.id,
                call_id: phoneCallResponse?.call_id,
                call_type: phoneCallResponse?.call_type,
                agent_id: phoneCallResponse?.agent_id,
                call_status: phoneCallResponse?.call_status,
                from_number: phoneCallResponse?.from_number,
                to_number: phoneCallResponse?.to_number,
                direction: phoneCallResponse?.direction,
                status : 3
              });
         
              const updatedata = `https://staging-login.nurtureme.ai/api/call-response`;
               const resUpdate = await axios.post(updatedata,
                {
                  call_status : phoneCallResponse?.call_status,
                  call_id : phoneCallResponse?.call_id,
                  id : callerdata?.id
                }
              );
       
    }

       
      
  } catch (error) {
      console.log({error});
       
  }
}
exports.callAnalisysCron = async () =>{
  try {
    const client = await getClient('');
    const calldetail = await Call.findOne({where: { call_status: 'ended', status : 3 }});
    if(calldetail){
     
     
      const callResponses = await client.call.retrieve(calldetail?.call_id);
      var utcMoment = moment.utc();
      console.log(utcMoment.format());
      if(callResponses){
        //console.log(callResponses)

        const scheduledata = await extrictData(callResponses?.transcript);

       const updateData =  {
          call_status : callResponses?.call_status,
          summary : callResponses?.call_analysis?.call_summary,
          start_time : scheduledata?.start_date_time,
          name : scheduledata?.name,
          id : calldetail?.retell_key,
          office_id : calldetail?.office_id,
          candidate_id : calldetail?.user_id,
        }
       
        await Call.update(
          { status : 2 },
          { where: { id: calldetail?.id },
        });
        const updatedataUrl = `https://staging-login.nurtureme.ai/api/call-update`;
        const resUpdate = await axios.post(updatedataUrl,
          updateData
       );
       console.log(resUpdate?.data)
      }
    }
    
  } catch (error) {
    console.log({message : error?.message})
  }
}
const extrictData = async (transcript) =>{
  try {
       
        
    var utcMoment = moment.utc();
    let currentTime = utcMoment.format();

        const openai = new OpenAI({
               apiKey: process.env.OPENAI_APIKEY,
             });
         
             // Define the expected structure for extracted data
             const conversationStruct = z.object({
              start_date_time: z.string().nullable(), // Allow null for missing values
              end_date_time: z.string().nullable(),
              name: z.string().nullable(),
              
             });
         
             // Request AI to extract structured details from the transcript
             const completion = await openai.beta.chat.completions.parse({
               model: "gpt-4o-2024-08-06",
               messages: [
                 {
                   role: "system",
                   content: `Read the following conversation between a user and an agent.
Analyze the conversation to determine whether the candidate has confirmed the interview schedule.

Current Date Time : ${currentTime}

If the interview is confirmed, extract the relevant details and return them in JSON format..
                   - **Do NOT fabricate missing data**. If a value is not present, return **null** or an **empty string**.
                   - Ensure proper email validation.`,
                 },
                 { role: "user", content: transcript },
               ],
               response_format: zodResponseFormat(conversationStruct, "user_data"),
             });
         
             // Extract and validate the structured data
             let extractedData = completion.choices?.[0]?.message?.parsed || {};
             return extractedData;
    } catch (error) {
      console.log({error : error?.message});
    }
}