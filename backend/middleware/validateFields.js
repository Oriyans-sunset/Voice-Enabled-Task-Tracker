// Simple whitelist middleware to reject unknown fields in request payloads

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

exports.validateTaskFields = validateFields(TASK_ALLOWED);
exports.validateTaskPatchFields = validateFields(TASK_ALLOWED);
