module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contacts", {
        first_name: { type: Sequelize.STRING },
        last_name: { type: Sequelize.STRING },
        phone: { type: Sequelize.STRING },
        status: { type: Sequelize.NUMBER }
    });
    return Contact;
};
  