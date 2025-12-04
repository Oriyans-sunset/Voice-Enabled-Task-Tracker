const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// takes raw text transcript and returns task object
async function parseTranscriptToTask(transcript) {
  if (!transcript || typeof transcript !== "string") {
    throw new Error("Transcript must be a non-empty string");
  }

  let todaysDate = new Date();
  console.log("Today's date:", todaysDate.toISOString().split("T")[0]);

  const prompt = `
You are a task parser. Convert the following natural language text 
into a JSON task object.

Transcript:
"${transcript}"

Extract these fields:

- "title": short title for the task
- "description": optional extra details
- "status": one of ["todo", "in_progress", "done"]
    Default to "todo" if missing.
- "priority": one of ["low", "medium", "high", "critical"]
    Default to "medium" if missing.
- "dueDate": understand what the user wants the due date to be and convert that natural language into an ISO 8601 date string. For example, if the user says "due tomorrow" it means, the date would be today's date + 1 day, etc.
    If no due date is mentioned = null.

Return ONLY valid JSON:
{
  "title": "the extracted title",
  "description": "the extracted description",
  "status": "the extracted status",
  "priority": "the extracted priority",
  "dueDate": "the extrapolated dueDate",
}`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-5", // good enough for our test case
      messages: [
        { role: "system", content: "You are a strict JSON task extractor." },
        { role: "user", content: prompt },
      ],
    });

    const raw = response.choices[0].message.content.trim();
    const content = raw
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    console.log("LLM Response:", content);

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      throw new Error("LLM returned invalid JSON");
    }

    return {
      title: parsed.title || "New Task",
      description: parsed.description || "",
      status: ["todo", "in_progress", "done"].includes(parsed.status)
        ? parsed.status
        : "todo",
      priority: ["low", "medium", "high", "critical"].includes(parsed.priority)
        ? parsed.priority
        : "medium",
      dueDate: parsed.dueDate || null,
    };
  } catch (err) {
    console.error("Voice parsing error:", err);
    throw new Error("Failed to parse voice transcript");
  }
}

module.exports = { parseTranscriptToTask };
