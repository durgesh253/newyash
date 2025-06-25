const axios = require('axios');
const cheerio = require('cheerio');
const getClient = require("./../config/retell");
const fs = require("fs");
const { db } = require("./../models/index");
const Op = require('sequelize').Op
const Call = db.call;
const User = db.user;
exports.initialAgent = async (req, res) => {
    try {
        let user_id = '';
        let userData = '';
        const { url, phone, business, initId } = req.body;
        const client = await getClient();
        let knowledge = {};
        if (url !== '') {
            const {links, title} = await fetchWebsiteAllUrls(url);
            knowledge.knowledge_base_name = title.substring(0, 40);;
            knowledge.knowledge_base_urls = links;
        }
        if (req.file) {
            knowledge.knowledge_base_name =  req.file?.filename.substring(0, 40);
            knowledge.knowledge_base_files = [fs.createReadStream(req.file?.path)];
        }
        
        const knowledgeBaseResponse = await client.knowledgeBase.create(knowledge);
        let response_engine = {};
        let llmData = {};
        
        //   llmData.model = 'gpt-4o';
        //   llmData.general_prompt = 'prompt ';
        //   llmData.begin_message = 'Hello, How can help you today?';
          llmData.knowledge_base_ids = [knowledgeBaseResponse?.knowledge_base_id];
        
          await client.llm.update('llm_9aa8e732ab273ef6fe5ae7e1bb36', llmData);

          
          const phoneCallResponse = await client.call.createPhoneCall({
            from_number: process.env.PHONE_NUMBER,
            to_number: phone,
            override_agent_id: 'agent_df4a3425611ed8249ecad807fd',
          });
          //const result = await User.findOne({ where: { phone: phone } });
          const result = await User.findOne({ where: { [Op.or]: [{phone: phone}, {id: initId}] } });
          userData = result
          user_id = result?.id;
          if (!result) {
           
            userData = await User.create({phone: phone, business : business});
            user_id = userData?.id;
           
          } 
          Call.create({
            user_id : user_id,
            call_id: phoneCallResponse?.call_id,
            call_type: phoneCallResponse?.call_type,
            agent_id: phoneCallResponse?.agent_id,
            call_status: phoneCallResponse?.call_status,
            from_number: phoneCallResponse?.from_number,
            to_number: phoneCallResponse?.to_number,
            direction: phoneCallResponse?.direction,
          });
          //llm_e85bd5902bab560448cdf67041ef
        //   const llmResponse = await client.llm.create(llmData);
        //   response_engine = {
        //     llm_id: llmResponse?.llm_id,
        //     type: "retell-llm",
        //   };

        //   const agentResponse = await client.agent.create({
        //     response_engine,
        //     agent_name:  knowledge.knowledge_base_name,
        //     voice_id: '11labs-Dorothy',
        //     language: 'en-US',
        //     voice_speed: 1.2,
        //     end_call_after_silence_ms: 60000,
        //     max_call_duration_ms: 300000,
        //   });

        
        res.status(200).json({ response: true, data: userData });
    } catch (error) {
        console.error('Error :', error.message);
    
        res.status(error?.body?.statusCode || 500).json({ message: error?.response?.data?.message });
    }
}
const fetchWebsiteAllUrls = async (baseUrl) => {
    try {
        const { data } = await axios.get(baseUrl);
        const $ = cheerio.load(data);
        $('script').remove();
        // Get all text content
        const title = $('title').text().trim();
        const links = [];
        links.push(baseUrl)
        $('a').each((_, element) => {
            let link = $(element).attr('href');
            if (!link || link.startsWith('#') || link.startsWith('javascript:void(0)')) return;
            link = new URL(link, baseUrl).href;
            if (!links.includes(link)) {
                links.push(link);
            }
        });
        if (links.length > 3) {
          links.length = 3; // Truncate array to 5 elements
        }
        return {links, title};
    } catch (error) {
        console.error('Error fetching website:', error.message);
    }
};