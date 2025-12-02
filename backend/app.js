var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { syncDatabase } = require("./models");

var indexRouter = require("./routes/index");
var tasksRouter = require("./routes/tasks");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// initialize tables
try {
  syncDatabase({ alter: true }).catch((err) => {
    console.error("Failed to sync database:", err);
  });
} catch (e) {
  console.error("DB sync hook error:", e);
}

// routes
app.use("/", indexRouter);
app.use("/tasks", tasksRouter);

// catch 404 and respond with JSON
app.use(function (req, res, next) {
  res.status(404).json({ error: "Not Found" });
});

// error handler (JSON)
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const isDev = req.app.get("env") === "development";
  res.status(status).json({
    message: err.message,
    ...(isDev ? { stack: err.stack } : {}),
  });
});

module.exports = app;
