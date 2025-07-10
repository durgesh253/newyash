// utils/shopifyUtils.js
const axios = require('axios');

const SHOP_NAME = process.env.SHOP_NAME || 'xqtfk8-06';
const ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
const API_VERSION = '2024-04';
const SHOP_URL = `https://${SHOP_NAME}.myshopify.com`;
const HEADERS = {
  'X-Shopify-Access-Token': ACCESS_TOKEN,
  'Content-Type': 'application/json',
};

exports.SHOP_URL = SHOP_URL;
exports.API_VERSION = API_VERSION;
exports.HEADERS = HEADERS;

exports.extractId = (message) => {
  const orderMatch = message.toLowerCase().match(/order[:\s]+(\d+)/);
  const draftMatch = message.toLowerCase().match(/draft[:\s]+(\d+)/);
  const productMatch = message.toLowerCase().match(/product[:\s]+(\d+)/);
  const numberMatch = message.match(/(\d+)/);

  if (orderMatch) return [orderMatch[1], 'order'];
  if (draftMatch) return [draftMatch[1], 'draft'];
  if (productMatch) return [productMatch[1], 'product'];
  if (numberMatch) return [numberMatch[1], 'unknown'];
  return [null, null];
};

exports.fetchShopifyData = async (id, type) => {
  try {
    let url;
    if (type === 'order') {
      url = `${SHOP_URL}/admin/api/${API_VERSION}/orders/${id}.json`;
      const response = await axios.get(url, { headers: HEADERS });
      const order = response.data.order;
      return {
        id: order.id.toString(),
        order_number: order.order_number.toString(),
        financial_status: order.financial_status,
        fulfillment_status: order.fulfillment_status || 'unfulfilled',
        created_at: order.created_at,
        total_price: order.total_price,
      };
    } else if (type === 'draft') {
      url = `${SHOP_URL}/admin/api/${API_VERSION}/draft_orders/${id}.json`;
      const response = await axios.get(url, { headers: HEADERS });
      const draft = response.data.draft_order;
      return {
        id: draft.id.toString(),
        status: draft.status,
        created_at: draft.created_at,
        total_price: draft.total_price,
      };
    } else if (type === 'product') {
      url = `${SHOP_URL}/admin/api/${API_VERSION}/products/${id}.json`;
      const response = await axios.get(url, { headers: HEADERS });
      const product = response.data.product;
      const price = product.variants && product.variants.length > 0 ? product.variants[0].price : '0.00';
      const image_url = product.images && product.images.length > 0 ? product.images[0].src : null;
      return {
        id: product.id.toString(),
        title: product.title,
        description: product.body_html || '',
        price,
        status: product.status,
        created_at: product.created_at,
        image_url,
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching Shopify ${type} data:`, error.message);
    return null;
  }
};
