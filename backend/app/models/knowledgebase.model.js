module.exports = (sequelize, Sequelize) => {
    const Knowledgebase = sequelize.define("knowledgebases", {
        user_id: { type: Sequelize.NUMBER },
        name: { type: Sequelize.STRING },
        status: { type: Sequelize.STRING },
        flag: { type: Sequelize.NUMBER }
    });
    return Knowledgebase;
};
  