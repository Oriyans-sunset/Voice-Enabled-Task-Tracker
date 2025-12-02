const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelize");

const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  priority: {
    type: DataTypes.STRING,
    validate: {
      isIn: [["low", "medium", "high", "critical"]],
    },
  },
  dueDate: { type: DataTypes.DATE },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "todo",
    validate: {
      isIn: [["todo", "in_progress", "done"]],
    },
  },
});

console.log("Does model exist ?", Task === sequelize.models.Task);

module.exports = Task;
