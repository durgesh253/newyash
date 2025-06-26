module.exports = (sequelize, Sequelize) => {
    const Call = sequelize.define("callhistories", {
        user_id: { type: Sequelize.NUMBER },
        caller_name: { type: Sequelize.STRING },
        caller_email: { type: Sequelize.STRING },
        language: { type: Sequelize.STRING },
        accent: { type: Sequelize.STRING },
        voice_type: { type: Sequelize.STRING },
        office_id: { type: Sequelize.NUMBER },
        retell_key: { type: Sequelize.STRING },
        call_id: { type: Sequelize.STRING },
        call_type: { type: Sequelize.STRING },
        agent_id: { type: Sequelize.STRING },
        call_status: { type: Sequelize.STRING },
        summery: { type: Sequelize.STRING },
        from_number: { type: Sequelize.STRING },
        to_number: { type: Sequelize.STRING },
        direction: { type: Sequelize.STRING },
        call_use: { type: Sequelize.STRING },
        next_schedual: { type: Sequelize.STRING },
        status: {
            type: Sequelize.NUMBER,
        }
    });
    return Call;
  };
  