module.exports = (sequelize, Sequelize) => {
  const Retell = sequelize.define("retells", {
    keyname: { type: Sequelize.STRING },
    apiKey: { type: Sequelize.STRING },
    status: {
      type: Sequelize.NUMBER,
    },
  });
  return Retell;
};
