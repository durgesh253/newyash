const { db } = require("../models");
const Sequelize = require("sequelize");
const axios = require('axios');
const Op = Sequelize.Op;
const User = db.user;
const Retell = db.retell;
const Call = db.call;
exports.list = async (req, res) => {
  try {
    const { search, limit, skip, order_by } = req.query;

    let filter = {};
    if (search) {
      //filter.name = { [Op.like]: `%${search}%` };
      filter = {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } },
        ],
      };
    }

    const lmt = limit ? parseInt(limit) : 20;
    const offset = skip ? parseInt(skip) * lmt : 0 * lmt;
    const sorting = order_by ? order_by : "ASC";
    const users = await User.findAll({
      where: filter,
      offset: offset,
      limit: lmt,
      order: [["name", sorting]],
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Get users list Successfully.",
        data: users,
      });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

exports.loginOrRegiter = async (req, res) => {
  const {name, email, picture, sub, initId} = req.body;
  try {
    const result = await User.findOne({ where: { email: req.body.email } });
    if (!result) {
      const initExist = await User.findOne({ where: { id: initId } });
      if(initExist){
        const userdata = await User.update({name, email, picture, sub},{ where: { id: initId }});
        return res.status(201).json({ response: true, data: userdata });
      }else{
        const userdata = await User.create({name, email, picture, sub});
        return res.status(201).json({ response: true, data: userdata });
      }
     
    } else {
      await Call.update(
        { user_id : result?.id },
        { where: { user_id: initId },
      });
      return res.status(200).json({ response: true, data: result });
    }
  } catch (error) {
    res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
};

exports.getReviews = async (req, res) =>{
   try {
    const { place_id } = req.params;
    const reviews = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name,rating,reviews&key=${process.env.GOOGEL_KEY}`);
    
    return res.status(200).json({ response: true, data: reviews?.data });
   } catch (error) {
      res.status(error?.body?.statusCode || 500).json({ error: error.message });
   }
}

exports.findYourBusiness = async (req, res) =>{
  try {
   const { searchText } = req.body;
   const places = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${searchText}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Cplace_id%2Cgeometry&key=${process.env.GOOGEL_KEY}`);
   
   return res.status(200).json({ response: true, data: places?.data });
  } catch (error) {
     res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
}


exports.updateBusinessPlaceId = async (req, res) =>{
  try {
    const { user_id } = req.params;
   const { place_id } = req.body;
   const review_link = `https://search.google.com/local/writereview?placeid=${place_id}`;
   await User.update({place_id, review_link}, {where : {id : user_id}});
   const updatedata = await User.findOne({ where: {id : user_id} });
   return res.status(200).json({ response: true, data: updatedata });
  } catch (error) {
     res.status(error?.body?.statusCode || 500).json({ error: error.message });
  }
}
