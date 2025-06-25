
const config = require("../config/db.config.js");
const Sequelize = require("sequelize");



const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model")(sequelize, Sequelize);
db.retell = require("../models/retell.model")(sequelize, Sequelize);
db.call = require("../models/call.model")(sequelize, Sequelize);
db.import = require("../models/import.model")(sequelize, Sequelize);
db.samples = require("../models/samples.model")(sequelize, Sequelize);
db.agent = require("../models/agent.model")(sequelize, Sequelize);
db.knowledgebase = require("../models/knowledgebase.model")(sequelize, Sequelize);
db.contact = require("../models/contact.model")(sequelize, Sequelize);

module.exports = {db};
