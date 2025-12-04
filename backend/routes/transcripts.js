var express = require("express");
var router = express.Router();

var transcriptsController = require("../controllers/transcriptsController");

router.post("/", transcriptsController.sendTranscript);

module.exports = router;
