const { sequelize } = require("../db/sequelize");
const Task = require("./Task");

// Helper to sync tables
async function syncDatabase(options = { alter: true }) {
  await sequelize.sync(options);
}

module.exports = {
  sequelize,
  Task,
  syncDatabase,
};
