const express = require("express");
const cors = require("cors");
var cron = require('node-cron');
const http = require('http');
require('dotenv').config();
const app = express();
const  path  = require("path");
const socket = require("socket.io");
const bodyParser = require('body-parser');
const axios = require('axios');

const  {updateStatus, updateNextAction } = require('./app/controllers/call.controller');
const  {makecallCron, callAnalisysCron } = require('./app/controllers/resume.controller');
// const makeReservationCall = require('../controllers/reservationCallController');

const { reservationCallAnalysisCron } = require('./app/controllers/reservation.controller')


app.use(bodyParser.json({limit: '50mb'}));
app.use(express.raw({ type: 'application/pdf', limit: '50mb' }));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
const moment = require("moment");

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());


app.use("/images", express.static(__dirname + "/app/public/images"));
app.use("/product/image", express.static(__dirname + "/app/public/images/products"));
app.use("/media", express.static(__dirname + "/app/public/images/media"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/app/views/assets"))
app.set("views",__dirname +"/app/views");
app.get("/", (req, res) => {
  
  return res.render("index");
});

cron.schedule('*/3 * * * *', async () => {
   updateStatus();
});
cron.schedule('*/5 * * * *', async () => {
  updateNextAction();
 // console.log({ message: "Welcome to Harm AI API." });
});
cron.schedule('*/7 * * * *', async () => {
  // makecallCron();
 // console.log({ message: "Welcome to Harm AI API." });
});
cron.schedule('*/8 * * * *', async () => {
  // callAnalisysCron();
 // console.log({ message: "Welcome to Harm AI API." });
});
app.get("/test", (req, res) => {
  //callAnalisysCron();
  res.json({ message: "Welcome to Harm AI API." });
  // djA@9000
});


// Environment variables
const OPENPHONE_API_KEY = 'UVjItR2HUMjCyo7q5uwhsmAmghGAGg1Z';
const DEFAULT_OPENPHONE_NUMBER = '+919054760377';

// OpenPhone API endpoint
const OPENPHONE_API_URL = 'https://api.openphone.com/v1/messages';

/**
 * Send a text message via OpenPhone API
 * POST /send-message
 * 
 * Request body:
 * {
 *   "to": "+15555555555",  // Required: Recipient phone number in E.164 format
 *   "message": "Hello!"     // Optional: Custom message text (uses default if not provided)
 * }
 */
app.post('/send-message', async (req, res) => {
  try {
    console.log('Received request:', req.body);
    const { to, message } = req.body;
    
    // Validate recipient phone number
    if (!to || !to.match(/^\+[1-9]\d{1,14}$/)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid recipient phone number in E.164 format (e.g. +15555555555)'
      });
    }
    
    // Default message text if not provided
    const messageContent = message || "This is a default message from OpenPhone API";
    
    // Request payload for OpenPhone API
    const payload = {
      content: messageContent,
      from: DEFAULT_OPENPHONE_NUMBER,
      to: [to]
    };
    
    console.log('Sending request to OpenPhone API:', payload);
    
    // Make request to OpenPhone API
    const response = await axios.post(OPENPHONE_API_URL, payload, {
      headers: {
        'Authorization': OPENPHONE_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    
    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully',
      data: response.data
    });
    
  } catch (error) {
    console.error('Error sending message:', error);
    console.error('Error details:', error.response?.data || error.message);
    
    // Return error response
    return res.status(error.response?.status || 500).json({
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to send message'
    });
  }
});


// routes



require("./app/routes/api.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const io = socket(server,
  {
      cors: {
        origin: "*",
        credentials: true,
  },});
  exports.io = io;

