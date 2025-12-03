const TASK_ALLOWED = ["title", "description", "priority", "dueDate", "status"];

function validateFields(allowedKeys) {
  return (req, res, next) => {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ message: "Invalid or empty payload" });
    }
    const keys = Object.keys(req.body);
    const unknown = keys.filter((k) => !allowedKeys.includes(k));
    if (unknown.length) {
      return res.status(400).json({
        message: "Unknown fields in payload",
        unknownFields: unknown,
        allowedFields: allowedKeys,
      });
    }
    next();
  };
}

function validateDueDate(req, res, next) {
  const { dueDate } = req.body || {};
  if (dueDate === undefined || dueDate === null || dueDate === "") {
    return next();
  }
  const parsedDueDate = new Date(dueDate);
  if (Number.isNaN(parsedDueDate.getTime())) {
    return res.status(400).json({ message: "Invalid dueDate" });
  }
  const now = new Date();
  if (parsedDueDate < now) {
    return res.status(400).json({
      message: "Due date cannot be earlier than the current date",
    });
  }
  next();
}

exports.validateTaskFields = validateFields(TASK_ALLOWED);
exports.validateDueDate = validateDueDate;
