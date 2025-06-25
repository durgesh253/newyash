module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    name: { type: Sequelize.STRING },
    phone: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    business: { type: Sequelize.STRING },
    picture: { type: Sequelize.STRING },
    sub: { type: Sequelize.STRING },
    place_id: { type: Sequelize.STRING },
    review_link: { type: Sequelize.STRING },
    ret_token: { type: Sequelize.STRING },
    status: {
      type: Sequelize.NUMBER,
    },
  });
  return User;
};
