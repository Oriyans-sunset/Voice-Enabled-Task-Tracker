var express = require("express");
var router = express.Router();

var tasksController = require("../controllers/tasksController");
var {
  validateTaskFields,
  validateDueDate,
} = require("../middleware/validateFields");

router.get("/", tasksController.listTasks);
router.get("/:id", tasksController.getTask);
router.post(
  "/",
  validateTaskFields,
  validateDueDate,
  tasksController.createTask
);
router.patch("/:id", validateDueDate, tasksController.updateTask);
router.delete("/:id", tasksController.deleteTask);

module.exports = router;
