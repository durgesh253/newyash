module.exports = (sequelize, Sequelize) => {
    const Agent = sequelize.define("agents", {
        agent_id: { type: Sequelize.STRING },
        user_id: { type: Sequelize.NUMBER },
        name: { type: Sequelize.TEXT },
        voice: { type: Sequelize.TEXT },
        language: { type: Sequelize.TEXT },
        status: { type: Sequelize.NUMBER }
    });
    return Agent;
};
  