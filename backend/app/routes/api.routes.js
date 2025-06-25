const { authJwt } = require("../middleware");
const apiController = require("../controllers/api.controller.js");
const agent = require("../controllers/agent.controller");
const phone = require("../controllers/phone.controller");
const user = require("../controllers/user.controller");
const extrict = require("../controllers/extrict.controller");
const twilio = require("../controllers/twilio.controller");
const initial = require("../controllers/initial.controller");
const resume = require("../controllers/resume.controller");
const call = require("../controllers/call.controller");
const dashboard = require("../controllers/dashboard.controller");
const cron = require("../controllers/cron.controller");
const mail = require("../controllers/mail.controller");
const reservationController  = require("../controllers/reservation.controller.js");
const shopifyController  = require("../controllers/shopifyController.js");
const inquiryController = require("../controllers/inquiry.controller.js");
const demoController = require("../controllers/demo.controller.js");
const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
   
    const uniqueName = `${file.originalname}`;
    cb(null, uniqueName);
    
  }
});

// Multer file filter for PDFs only
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

// Initialize Multer middleware
const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter 
});

const validate = validations => {
    return async (req, res, next) => {
      for (let validation of validations) {
        const result = await validation.run(req);
        if (result.errors.length) break;
      }
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      res.status(400).json({ errors: errors.array() });
    };
  }
  module.exports = function (app) {
    app.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
   
    app.post("/api/webhook",[authJwt.verifyToken], apiController.webhook);
    app.get("/api/agents", agent.list);
    app.delete("/api/agents/:id", agent.delete);
    app.put("/api/agents/:id", agent.updateAgent);
    app.get("/api/agents/:id", agent.getAgent);
    app.delete("/api/agents/:id", agent.deleteAgent);
    app.post("/api/agents", agent.create);
    app.get("/api/llms", agent.llmList);
    app.put("/api/llms/:id", agent.llmUpdate);
    app.get("/api/llms/:id", agent.getLLM);
    app.get("/api/voices", agent.voiceList);
    app.get("/api/voices/:id", agent.voiceById);
    app.get("/api/knowledgeBase", agent.knowledgeBaseList);
    app.post("/api/knowledgeBase", upload.single('files'), agent.knowledgeBaseCreate);
    app.get("/api/calls", phone.list);
    app.get("/api/calls/:id", phone.getCallById);
    app.get("/api/phones", phone.phoneList);
    app.post("/api/contact", phone.createContact);
    app.get("/api/contact", phone.contactList);
    app.put("/api/contact/:id", phone.updateContact);
    app.delete("/api/contact/:id", phone.deleteContact);
    app.get("/api/phones/:id", phone.getPhoneById);
    app.post("/api/call/make", phone.makeCall);
    app.post("/api/phones/import", phone.importNumber);
    app.post("/api/phones/web", phone.makeWebCall);
    app.get("/api/users",user.list);
    app.post("/api/user",user.loginOrRegiter);
    app.post("/api/places",user.findYourBusiness);
    app.put("/api/places/:user_id",user.updateBusinessPlaceId);
    app.get("/api/reviews/:place_id",user.getReviews);
    app.get("/api/url",extrict.extrictUrl);
    app.delete("/api/knowledgeBase/:id", agent.removeKnowledgeBase);
    app.put("/api/knowledgeBase/:id", upload.single('files'), agent.updateKnowledgeBaseSource);
    app.get("/api/knowledgeBase/:id", agent.getKnowledgeBase);
    app.delete("/api/knowledgeBase-source/:knowledge_base_id/:source_id", agent.deleteKnowledgeBaseSource);
    app.post("/api/generate-prompt", extrict.generatePrompt);
    app.post("/api/prompt-test", extrict.testPrompt);
    app.post("/api/test-whatsapp", extrict.testTemp);
    app.get("/api/test-sms", twilio.testSMS);
    app.post("/api/initial-agent", upload.single('files'), initial.initialAgent);
    app.get("/api/sample-prompts", apiController.smaplePrompts);
    app.get("/api/call/list/:id", call.getCallList);
    app.get("/api/call/types/:type", call.getCallByTypes);
    app.get("/api/call/delete/:id", call.deleteCallById);
    app.post("/api/translate", apiController.translateLang);
    app.post("/api/dashboard", dashboard.getDashboard);
    app.post("/api/import-data", cron.importData);
    app.post("/api/resume/make-call", resume.makecallresum);
    app.post("/api/mail/function", mail.custom);
    app.get("/api/mail/function", mail.custom);
    app.post("/api/call/instant", resume.makecall);
    // app.post("/api/inquiry" , inquiryController.makeInquiryCall);
    app.get('/api/reservations', reservationController.getAllReservations);
    app.post("/api/reservation-call", reservationController.makeReservationCall);
    app.get('/api/inquiries', inquiryController.getAllInquiries);
    app.post('/api/inquiry-call', inquiryController.makeInquiryCall);
    
    
    
    // Route to directly get reservation data (for debugging)
    app.get("/api/get-reservation/:id", async (req, res) => {
      try {
        const data = await reservationController.getReservationData(req.params.id);
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
    app.post('/api/demo-call', demoController.makeDemoCall);
    app.get('/api/demo-call-stats', demoController.getDemoCallStats);
    app.get('/api/call-report/:call_id', demoController.getCallReport);


    app.get('/api/orders/:orderId', shopifyController.getOrder);
    app.get('/api/draft_orders/:draftId', shopifyController.getDraftOrder);
    app.get('/api/products/:productId', shopifyController.getProduct);

    // Demo call routes
    
    

    
    
};
  