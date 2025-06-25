module.exports = (sequelize, Sequelize) => {
    const Sample = sequelize.define("sample_prompts", {
        name: { type: Sequelize.STRING },
        prompts: { type: Sequelize.TEXT },
        intiale_sentence: { type: Sequelize.TEXT },
        intro: { type: Sequelize.TEXT },
        status: { type: Sequelize.NUMBER }
    });
    return Sample;
};
  