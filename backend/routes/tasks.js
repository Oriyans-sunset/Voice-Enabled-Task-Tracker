var express = require("express");
var router = express.Router();

/* GET users listing. */
var tasksController = require("../controllers/tasksController");
var {
  validateTaskFields,
  validateTaskPatchFields,
} = require("../middleware/validateFields");

/* Users CRUD */
router.get("/", tasksController.listTasks);
router.get("/:id", tasksController.getTask);
router.post("/", validateTaskFields, tasksController.createTask);
router.patch("/:id", validateTaskPatchFields, tasksController.updateTask);
router.delete("/:id", tasksController.deleteTask);

module.exports = router;
