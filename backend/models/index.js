const { sequelize } = require("../db/sequelize");
const Task = require("./Task");

// helper to sync tables
async function syncDatabase(options = { alter: true }) {
  await sequelize.sync(options);
}

module.exports = {
  sequelize,
  Task,
  syncDatabase,
};
