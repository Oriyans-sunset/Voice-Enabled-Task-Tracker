const { parseTranscriptToTask } = require("../utils/parsing");

exports.sendTranscript = async function (req, res) {
  try {
    let { transcripts } = req.body;
    console.log("Received transcript:", transcripts);

    // create a mock task obj and send that back, use parsing.js to get the task object
    let task = await parseTranscriptToTask(transcripts);
    console.log("Parsed task:", task);

    if (!task) {
      return res
        .status(400)
        .json({ message: "LLM could not parse any task information." });
    }

    return res.status(201).json(task);
  } catch (err) {
    console.error("Error processing transcript:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
