const { Task } = require("../models");

exports.listTasks = async function (req, res, next) {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.getTask = async function (req, res, next) {
  try {
    const id = Number(req.params.id);
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.createTask = async function (req, res, next) {
  try {
    let { title, description, priority, dueDate, status } = req.body || {};
    if (!title) {
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-GB");
      title = "Task created on " + formattedDate;
    }
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      status,
    });
    res.status(201).json(task);
  } catch (err) {
    if (
      err &&
      (err.name === "SequelizeValidationError" ||
        err.name === "SequelizeUniqueConstraintError")
    ) {
      return res.status(400).json({
        message: "Validation failed",
        errors: err.errors?.map((e) => ({
          field: e.path,
          message: e.message,
        })) || [{ message: err.message }],
      });
    }
    next(err);
  }
};

exports.updateTask = async function (req, res, next) {
  try {
    // do not want to accept empty payload for patching, can mess up existing data
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Empty update payload" });
    }
    const id = Number(req.params.id);
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.update(req.body, { validate: true });
    res.json(task);
  } catch (err) {
    if (
      err &&
      (err.name === "SequelizeValidationError" ||
        err.name === "SequelizeUniqueConstraintError")
    ) {
      return res.status(400).json({
        message: "Validation failed",
        errors: err.errors?.map((e) => ({
          field: e.path,
          message: e.message,
        })) || [{ message: err.message }],
      });
    }
    next(err);
  }
};

exports.deleteTask = async function (req, res, next) {
  try {
    const id = Number(req.params.id);
    console.log("Deleting task with id:", id);
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
