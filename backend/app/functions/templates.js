require('dotenv').config();
const axios = require('axios').default;
exports.orderConfirmTemplate = async (phone, name, orderNo, date, total) => {
    const options = {
        method: 'POST',
        url: 'https://backend.aisensy.com/direct-apis/t1/messages',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, application/xml',
            Authorization: `Bearer ${process.env.WHATSAPP_SECRET}`
    },
    data: {
        to: phone,
        type: 'template',
        template: {
          language: {policy: 'deterministic', code: 'en'},
          name: 'order_confirm',
          components: [
            {type: 'body', parameters: [
                {type: 'text', text: name},
                {type: 'text', text: orderNo},
                {type: 'text', text: date},
                {type: 'text', text: total}
            ]},
           
          ]
        }
      }
    };
    
    try {
        const { data } = await axios.request(options);
        console.log(data);
       
      } catch (error) {
        console.error(error);
        
      }
}

exports.reminderInvoiceTemplate = async (phone, name, service, date, invoiceNo, amount, pdfUrl ) => {
  const options = {
    method: 'POST',
    url: 'https://backend.aisensy.com/direct-apis/t1/messages',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, application/xml',
        Authorization: `Bearer ${process.env.WHATSAPP_SECRET}`
    },
    data: {
        to: phone,
        type: 'template',
        template: {
          language: {policy: 'deterministic', code: 'en'},
          name: 'payment_reminder_template',
          components: [
            {
              type: "header",
              parameters: [
                {
                  type: "document",
                  document: {
                    link: pdfUrl,
                    filename: invoiceNo
                  }
                }
              ]
            },
            {type: 'body', parameters: [
                {type: 'text', text: name},
                {type: 'text', text: service},
                {type: 'text', text: date},
                {type: 'text', text: invoiceNo},
                {type: 'text', text: amount}
            ]},
            
          ]
        }
      }
  };
      
  try {
      const { data } = await axios.request(options);
      console.log(data);
      
    } catch (error) {
      console.error(error);
      
    }
}