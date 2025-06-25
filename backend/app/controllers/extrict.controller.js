const axios = require("axios");
const cheerio = require("cheerio");
const OpenAI = require("openai");
exports.extrictUrl = async (req, res) => {
  try {
    const links = await fetchWebsiteAllUrls(
      "https://yogreet.com/facebook-messenger-integration"
    );

    return res.status(201).json({ response: true, links });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const fetchWebsiteAllUrls = async (baseUrl) => {
  try {
    const { data } = await axios.get(baseUrl);
    // const parsedUrl = new URL(baseUrl);
    // const origin = parsedUrl?.parsedUrl
    // console.log({parsedUrl})
    const $ = cheerio.load(data);
    $("script").remove();
    // Get all text content
    const textContent = $("body").text().trim();
    const links = [];
    links.push(baseUrl);
    $("a").each((_, element) => {
      let link = $(element).attr("href");

      // Ignore empty, '#' and 'javascript:void(0);' links
      if (
        !link ||
        link.startsWith("#") ||
        link.startsWith("javascript:void(0)")
      )
        return;

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
    console.error("Error fetching website:", error.message);
  }
};

exports.generatePrompt = async (req, res) => {
  try {
    const { purpose } = req.body;
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
    return res.status(201).json({ response: true, data: prompt });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

exports.testPrompt = async (req, res) => {
  try {
    const answer = `\n\nGive a 15-20 word answer. Use casual words like 'hmm,' 'ya,' or 'like' sometimes. Ask a follow-up if needed.`;

    const { inputPrompt, input } = req.body;
    const instruction = [
      {
        role: "system",
        content: inputPrompt + answer,
      },
    ];
    if (input.trim()) {
      instruction.push({ role: "user", content: input });
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
    return res.status(201).json({ response: true, data: prompt });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

exports.testTemp = async (req, res) => {
  try {
    const { from_num, name, receiver_upmatrixId } = req.body;
    await sendTempImage(from_num, name, receiver_upmatrixId);
    return res.status(201).json({ response: true, data: [] });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};
const sendFlowTemp = async (from, name, receiver_upmatrixId) => {
  try {
    const options = {
      method: "POST",
      url: "https://app-api.upmatrix.in/api/waba/send-message",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, application/xml",
        Authorization: `Bearer ${receiver_upmatrixId}`,
      },
      data: {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: from,
        type: "template",
        template: {
          name: name,
          language: {
            code: "en",
          },
          components: [
            {
              type: "button",
              sub_type: "flow",
              index: "0",
            },
          ],
        },
      },
    };

    const { data } = await axios.request(options);

    console.log(data);
  } catch (error) {
    console.log({ error: error?.message });
  }
};

const sendTemp = async (from, name, receiver_upmatrixId) => {
  try {
    const options = {
      method: "POST",
      url: "https://app-api.upmatrix.in/api/waba/send-message",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, application/xml",
        Authorization: `Bearer ${receiver_upmatrixId}`,
      },
      data: {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: from,
        type: "template",
        template: {
          name: name,
          language: {
            code: "en_US",
          },
        },
      },
    };

    const { data } = await axios.request(options);

    console.log(data);
  } catch (error) {
    console.log({ error: error });
  }
};

const sendTempImage = async (from, name, receiver_upmatrixId) => {
  try {
    const options = {
      method: "POST",
      url: "https://app-api.upmatrix.in/api/waba/send-message",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, application/xml",
        Authorization: `Bearer 6532|Hk9S3hhb5Esu6ry0ssZR1vLkQ1alR6HaQwUfwhDecfc6041f`,
      },
      data: {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: "+919825380434",
        type: "template",
        template: {
          name: "demo_explore_1",
          language: {
            code: "en_US",
          },
          components: [
            {
              type: "HEADER",
              parameters: [
                {
                  type: "IMAGE",
                  image: {
                    link: "https://app-api.upmatrix.in/assets/98b1ac97-4264-43e5-9c2a-1c2ba7efdc03/982f826c-466f-406c-b3a1-819a53fd32ce/1741001855.jpg",
                  },
                },
              ],
            }
          ],
        },
      },
    };

    const { data } = await axios.request(options);

    console.log(data);
  } catch (error) {
    console.log({ error: JSON.stringify(error) });
  }
};
