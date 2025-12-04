const { parseTranscriptToTask } = require("../utils/parsing");

exports.sendTranscript = async function (req, res) {
  try {
    let { transcripts } = req.body;
    console.log("Received transcript:", transcripts);

    // create a mock task obj and send that back, use parsing.js to get the task object
    let task = await parseTranscriptToTask(transcripts);
    console.log("Parsed task:", task);

    // mock task
    const mockTask = {
      id: 1,
      title: "new task from voice",
      description: "this task was created from voice transcript",
      status: "done",
      priority: "low",
      dueDate: "2025-12-31 18:00:00.000 +00:00",
    };

    return res.status(201).json(task);
  } catch (err) {
    console.error("Error processing transcript:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
