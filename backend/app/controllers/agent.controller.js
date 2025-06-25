const getClient = require("./../config/retell");
const { db } = require("./../models/index");
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");
const Agent = db.agent;
const Knowledgebase = db.knowledgebase;

exports.list = async (req, res) => {
  try {
   
    let token = req.headers["authtoken"] || "";
    const client = await getClient(token);
    const agentResponses = await client.agent.list();
    res.status(200).json({ response: true, data: agentResponses });
  } catch (error) {
    console.error("Main webhook error:", error); // Log the main error
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
};

exports.getAgent = async (req, res) => {
  const { id } = req.params;
  try {
    let token = req.headers["authtoken"] || "";
    const client = await getClient(token);
    const agentResponses = await client.agent.retrieve(id);
    res.status(200).json({ response: true, data: agentResponses });
  } catch (error) {
    console.error("Main webhook error:", error); // Log the main error
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
};

exports.deleteAgent = async (req, res) => {
  const { id } = req.params;
  try {
    let token = req.headers["authtoken"] || "";
    const client = await getClient(token);
    const agentResponses = await client.agent.delete(id);
    res.status(200).json({ response: true, data: agentResponses });
  } catch (error) {
    console.error("Main webhook error:", error); // Log the main error
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
};


exports.create = async (req, res) => {
  const {
    voice_id,
    agent_name,
    prompt,
    model,
    begin_message,
    knowledge_base_ids,
    language,
    llm_websocket_url,
    llmType,
    sampleId
  } = req.body;
  try {
    let token = req.headers["authtoken"] || "";
    let userid = req.headers["userid"] || "";
    const client = await getClient(token);
    const answer = `\n\nGive a 15-20 word answer. Use casual words like 'hmm,' 'ya,' or 'like' sometimes. Ask a follow-up if needed.`;
    let llmData = {};
    if (model) {
      llmData.model = model;
    }
    if (prompt && sampleId != '') {
      llmData.general_prompt = prompt;
    }else{
      llmData.general_prompt = await generatePrompt(prompt)+answer;
    }
    if (begin_message) {
      llmData.begin_message = begin_message;
    }
    if (knowledge_base_ids?.length > 0) {
      llmData.knowledge_base_ids = knowledge_base_ids;
    }
    const agentResponses = await client.llm.create(llmData);
    let response_engine = {};
    if (llmType == "custom-llm") {
      response_engine = {
        llm_websocket_url: llm_websocket_url,
        type: "custom-llm",
      };
    } else {
      response_engine = {
        llm_id: agentResponses?.llm_id,
        type: "retell-llm",
      };
    }

    const agentResponse = await client.agent.create({
      response_engine,
      agent_name: agent_name,
      voice_id: voice_id,
      language: language,
    });
    Agent.create({
      agent_id : agentResponse?.agent_id,
      user_id : userid,
      name : agent_name,
      voice : voice_id,
      language : language,
    });
    res.status(200).json({ response: true, data: agentResponse });
  } catch (error) {
    console.error("Main webhook error:", error); // Log the main error
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
};


const generatePrompt = async (purpose) => {
  try {
   
    const instruction = [
      {
            role: "system",
            content: `Act as an expert prompt engineer and craft a precise, well-structured prompt based on the following user details. Ensure the prompt is instructive, clear, and optimized for OpenAI's Voice call assistant Conversation. The output should be actionable, detailed, and formatted for maximum effectiveness. Generate only the prompt without extra explanations.`,
      },
    ];
    if (purpose.trim()) {
        instruction.push({ role: "user", content: purpose });
    }
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
    });
    const responceGen = await client.chat.completions.create({
        model: "gpt-4o",
        messages: instruction,
        temperature: 0.3,
        frequency_penalty: 0.8,
        presence_penalty: 0.5,
    });
    const prompt = responceGen?.choices[0]?.message.content;
    return prompt;
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.updateAgent = async (req, res) => {
  const { id } = req.params;
  const {
    voice_id,
    agent_name,
    prompt,
    model,
    begin_message,
    knowledge_base_ids,
    llmId,
    language,
    llmType,
    llm_websocket_url,
  } = req.body;
  try {
    let token = req.headers["authtoken"] || "";
    const client = await getClient(token);
    let llmData = {};
    if (model) {
      llmData.model = model;
    }
    if (prompt) {
      llmData.general_prompt = prompt;
    }
    if (begin_message) {
      llmData.begin_message = begin_message;
    }
    if (knowledge_base_ids?.length > 0) {
      llmData.knowledge_base_ids = knowledge_base_ids;
    }
    if (llmId) {
      const llmResponse = await client.llm.update(llmId, llmData);
    }
    let response_engine = {};
    if (llmType == "custom-llm") {
      response_engine = {
        llm_websocket_url: llm_websocket_url,
        type: "custom-llm",
      };
    } else {
      response_engine = {
        llm_id: llmId,
        type: "retell-llm",
      };
    }
    const agentResponse = await client.agent.update(id, {
      // response_engine,
      agent_name: agent_name,
      voice_id: voice_id,
      language: language,
    });

    res.status(200).json({ response: true, data: agentResponse });
  } catch (error) {
    console.error("Main webhook error:", error); // Log the main error
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    let token = req.headers["authtoken"] || "";
    const client = await getClient(token);
    const agentResponses = await client.agent.delete(id);
    res
      .status(200)
      .json({ response: true, message: "Agent Deleted Successfully." });
  } catch (error) {
    console.error("Main webhook error:", error); // Log the main error
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
};

exports.llmList = async (req, res) => {
  try {
    let token = req.headers["authtoken"] || "";
    const client = await getClient(token);
    const agentResponses = await client.llm.list();

    res.status(200).json({ response: true, data: agentResponses });
  } catch (error) {
    console.error("Main webhook error:", error); // Log the main error
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
};

exports.getLLM = async (req, res) => {
  const { id } = req.params;
  try {
    let token = req.headers["authtoken"] || "";
    const client = await getClient(token);
    const agentResponses = await client.llm.retrieve(id);

    res.status(200).json({ response: true, data: agentResponses });
  } catch (error) {
    console.error("Main webhook error:", error); // Log the main error
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
};

exports.llmUpdate = async (req, res) => {
  const { id } = req.params;
  const { prompt, model, begin_message, knowledge_base_ids } = req.body;
  try {
    let token = req.headers["authtoken"] || "";
    const client = await getClient(token);
    let updateData = {};
    if (model) {
      updateData.model = model;
    }
    if (prompt) {
      updateData.general_prompt = prompt;
    }
    if (begin_message) {
      updateData.begin_message = begin_message;
    }
    if (knowledge_base_ids?.length > 0) {
      updateData.knowledge_base_ids = knowledge_base_ids;
    }

    const agentResponses = await client.llm.update(id, updateData);

    res.status(200).json({ response: true, data: agentResponses });
  } catch (error) {
    // Log the main error
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
};

exports.voiceList = async (req, res) => {
  try {
    let token = req.headers["authtoken"] || "";
    const client = await getClient(token);
    const voiceResponses = await client.voice.list();

    res.status(200).json({ response: true, data: voiceResponses });
  } catch (error) {
    console.error("Main webhook error:", error); // Log the main error
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
};

exports.voiceById = async (req, res) => {
  const { id } = req.params;
  try {
    let token = req.headers["authtoken"] || "";
    const client = await getClient(token);
    const voiceResponses = await client.voice.retrieve(id);

    res.status(200).json({ response: true, data: voiceResponses });
  } catch (error) {
    console.error("Main webhook error:", error); // Log the main error
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
};
exports.knowledgeBaseList = async (req, res) => {
  try {
    let token = req.headers["authtoken"] || "";
    const client = await getClient(token);
    const voiceResponses = await client.knowledgeBase.list();

    res.status(200).json({ response: true, data: voiceResponses });
  } catch (error) {
    console.error("Main webhook error:", error); // Log the main error
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
};
exports.knowledgeBaseCreate = async (req, res) => {
  const { name, texts, urls, files } = req.body;

  try {
    let token = req.headers["authtoken"] || "";
    const client = await getClient(token);
    let knowledge = {};
    if (name) {
      knowledge.knowledge_base_name = name;
    }
    if (texts?.length > 0) {
      knowledge.knowledge_base_texts = [{
        text: texts,
        title: name,
      }];
    }
    if (urls?.length > 0) {
      const links = await fetchWebsiteAllUrls(urls);
      
      knowledge.knowledge_base_urls = links;
    }
    if (req.file) {
      //knowledge.knowledge_base_name = req.file?.filename;
      knowledge.knowledge_base_name = name ? name : req.file?.filename;
      knowledge.knowledge_base_files = [fs.createReadStream(req.file?.path)];
    }
    
    const knowledgeBaseResponse = await client.knowledgeBase.create(knowledge);

    res.status(200).json({ response: true, data: knowledgeBaseResponse });
   
  } catch (error) {
    console.error("Main webhook error:", error); // Log the main error
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
};

const fetchWebsiteAllUrls = async (baseUrl) => {
    try {
        const { data } = await axios.get(baseUrl);
        const $ = cheerio.load(data);
        $('script').remove();
        // Get all text content
        const textContent = $('body').text().trim();
        const title = $('title').text().trim();
        console.log({ title });
        const links = [];
        links.push(baseUrl)
        $('a').each((_, element) => {
            let link = $(element).attr('href');

            // Ignore empty, '#' and 'javascript:void(0);' links
            if (!link || link.startsWith('#') || link.startsWith('javascript:void(0)')) return;

            // Convert relative links to absolute URLs
            link = new URL(link, baseUrl).href;

            // Avoid duplicates
            if (!links.includes(link)) {
                links.push(link);
            }

        });
        if (links.length > 5) {
          links.length = 5; // Truncate array to 5 elements
      }
        return links;
    } catch (error) {
        console.error('Error fetching website:', error.message);
    }
};

exports.removeKnowledgeBase = async (req, res) => {
  try {
    const { id } = req.params;
    let token = req.headers["authtoken"] || "";
    const client = await getClient(token);
    await client.knowledgeBase.delete(id);
    res.status(200).json({ response: true, message: "Knowledgebase delete Successfully." });
  } catch (error) {
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
}

exports.getKnowledgeBase = async (req, res) => {
  try {
    const { id } = req.params;
    let token = req.headers["authtoken"] || "";
    const client = await getClient(token);
    const datas = await client.knowledgeBase.retrieve(id);
    res.status(200).json({ response: true, data: datas });
  } catch (error) {
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
}

exports.deleteKnowledgeBaseSource = async (req, res) => {
  try {
    const { knowledge_base_id, source_id } = req.params;
    let token = req.headers["authtoken"] || "";
    const client = await getClient();
    const datas = await client.knowledgeBase.deleteSource(knowledge_base_id, source_id);
    res.status(200).json({ response: true, data: datas});
  } catch (error) {
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
}


exports.updateKnowledgeBaseSource = async (req, res) => {
  try {
    const { texts, urls, files } = req.body;
    const { id } = req.params;
    let token = req.headers["authtoken"] || "";
    let knowledge = {};
   
    if (texts?.length > 0) {
      knowledge.knowledge_base_texts = [{
        text: texts,
        title: 'Content',
      }];
    }
    if (urls?.length > 0) {
      const links = [urls];
      knowledge.knowledge_base_urls = links;
    }
    if (req.file) {
     
      knowledge.knowledge_base_files = [fs.createReadStream(req.file?.path)];
    }
    console.log({knowledge});
    const response = await axios.post(
          `https://api.retellai.com/add-knowledge-base-sources/${id}`,
          knowledge,
          {
            headers: {
              Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
    res.status(200).json({ response: true, data: response});
  } catch (error) {
    res.status(error?.body?.statusCode || 500).json({ error: error?.response?.data?.message });
  }
}