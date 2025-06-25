const twilio = require("twilio");
const getClient = require("./../config/retell");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");
const { db } = require("./../models/index");
const { where } = require("sequelize");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const Call = db.call;
const callUpdate = async () =>{
    try {
     const datatime = moment().add(-20, "minutes").format("YYYY-MM-DD HH:mm:ss");
        const callres = await Call.findOne({
            where:{
                call_status : 'registered',
                createdAt : {
                [Op.and]: { [Op.lte]: datatime }
            }
            }});
        if(callres){
            const client = await getClient(callres?.retell_key);
            const callResponses = await client.call.retrieve(callres?.call_id);
            if(callResponses){
                Call.update({call_status : callResponses?.call_status, summery : callResponses?.call_analysis?.call_summary},{ where:{id : callres.id}});
            }
            
        }
        
    } catch (error) {
        
    }
}

exports.testSMS = async (req, res) => {
    try {
        sendReviewSMS();
      return res.status(200).json({ response: true, data: [] });
    } catch (error) {
      res.status(500).json({ error: error?.message });
    }
  };


const sendReviewSMS = async () =>{
    const sms = `Hi,
Thank you for using Our Service! We’d love to hear your feedback. 
Please take a moment to leave us a review here: 

https://search.google.com/local/writereview?placeid=ChIJ3SyjTyUww0cRu_qEs5wo-Y8

Your feedback helps us improve! Thanks`
    const message = await client.messages.create({
        body: sms,
        from: "+14153587132",
        to: "+919825380434",
    });
    
    console.log(message.body);
}