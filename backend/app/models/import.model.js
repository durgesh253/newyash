module.exports = (sequelize, Sequelize) => {
    const Import = sequelize.define("import_datas", {
        name: { type: Sequelize.STRING },
        place_id: { type: Sequelize.STRING },
        description: { type: Sequelize.TEXT },
        phone: { type: Sequelize.STRING },
        categories: { type: Sequelize.STRING },
        owner_name: { type: Sequelize.STRING },
        address: { type: Sequelize.STRING },
        call_status: { type: Sequelize.NUMBER },
        status: {
            type: Sequelize.NUMBER,
        },
    });
    return Import;
  };
  