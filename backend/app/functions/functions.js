const {db} = require("../models/index");
const Order = db.order;
const Invoice = db.invoice;

exports.orderNoGen = async() => {
   const orderData = await Order.findOne({ order: [['id', 'DESC']] });
   if(orderData){
        const last_order = orderData?.orderNo;
        const last = parseInt(last_order.match(/\d+/)[0], 10);
        const next = last + 1;
        const paddedNumber = String(next).padStart(7, '0');
        return `ORD${paddedNumber}`;
    }
    return `ORD0000001`;
};

exports.invoiceNoGen = async() => {
    const invoice = await Invoice.findOne({ order: [['id', 'DESC']] });
    if(invoice){
         const last_invoice = invoice?.invoiceNo;
         const last = parseInt(last_invoice.match(/\d+/)[0], 10);
         const next = last + 1;
         const paddedNumber = String(next).padStart(7, '0');
         return `INV${paddedNumber}`;
     }
     return `INV0000001`;
 };

 exports.generateRandomString = async(length) =>{
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
