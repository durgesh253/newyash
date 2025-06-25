const axios = require('axios').default;
const { db } = require("./../models/index");
// const { translate  } = require("@vitalets/google-translate-api");
// const {Translate} = require('@google-cloud/translate').v2;
const { translate } = require('free-translate');
const Sample = db.samples;
exports.webhook = async (req, res) => {
   
    try {
       
        res.status(200).json({ response: true }); 
    } catch (error) {
        console.error("Main webhook error:", error); // Log the main error
        res.status(500).json({ error: error.message });
    }
};
exports.translateLang = async (req, res) =>{
    try {
        const { sentence, language} = req.body;
       
        const translatedText = await translate(sentence, {  to: language });
        res.status(200).json({ response: true, data :  translatedText}); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.smaplePrompts = async (req, res) => {
   
    try {
        const prompts = await Sample.findAll();
        res.status(200).json({ response: true, data :  prompts}); 
        
    } catch (error) {
        console.error("Main webhook error:", error); // Log the main error
        res.status(500).json({ error: error.message });
    }
};