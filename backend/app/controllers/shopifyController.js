const axios = require('axios');
const { SHOP_URL, API_VERSION, HEADERS } = require('../utils/shopifyUtils');

exports.getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const url = `${SHOP_URL}/admin/api/${API_VERSION}/orders/${orderId}.json`;
    const response = await axios.get(url, { headers: HEADERS });
    const order = response.data.order;

    res.json({
      id: order.id.toString(),
      order_number: order.order_number.toString(),
      financial_status: order.financial_status,
      fulfillment_status: order.fulfillment_status || 'unfulfilled',
      created_at: order.created_at,
      total_price: order.total_price,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: `Order with ID ${req.params.orderId} not found` });
    }
    res.status(error.response?.status || 500).json({ message: `Error retrieving order: ${error.message}` });
  }
};

exports.getDraftOrder = async (req, res) => {
  try {
    const { draftId } = req.params;
    const url = `${SHOP_URL}/admin/api/${API_VERSION}/draft_orders/${draftId}.json`;
    const response = await axios.get(url, { headers: HEADERS });
    const draft = response.data.draft_order;

    res.json({
      id: draft.id.toString(),
      status: draft.status,
      created_at: draft.created_at,
      total_price: draft.total_price,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: `Draft order with ID ${req.params.draftId} not found` });
    }
    res.status(error.response?.status || 500).json({ message: `Error retrieving draft order: ${error.message}` });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const url = `${SHOP_URL}/admin/api/${API_VERSION}/products/${productId}.json`;
    const response = await axios.get(url, { headers: HEADERS });
    const product = response.data.product;

    const price = product.variants && product.variants.length > 0 ? product.variants[0].price : '0.00';
    const image_url = product.images && product.images.length > 0 ? product.images[0].src : null;

    res.json({
      id: product.id.toString(),
      title: product.title,
      description: product.body_html || '',
      price,
      status: product.status,
      created_at: product.created_at,
      image_url,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: `Product with ID ${req.params.productId} not found` });
    }
    res.status(error.response?.status || 500).json({ message: `Error retrieving product: ${error.message}` });
  }
};