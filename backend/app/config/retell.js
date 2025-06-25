const Retell = require("retell-sdk");
// const client = new Retell({
//   apiKey: process.env.RETELL_API_KEY,
// });
// console.log({client});
const getClient = async (token = "") => {
  try {
    //let token = req.headers["authtoken"] || '';
    //return token;
    //  return new Retell({
    //       apiKey: token || process.env.RETELL_API_KEY,
    //   });
    return new Retell({
      apiKey: process.env.RETELL_API_KEY,
    });
  } catch (error) {}
};

module.exports = getClient;
