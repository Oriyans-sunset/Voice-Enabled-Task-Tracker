import { useState, useRef } from "react";
import { tasksService } from "../services/tasksService";
import { useTasksStore } from "../tasksStore";

const sampleFields = [
  { label: "Title", value: "Review PR for authentication module" },
  { label: "Priority", value: "High" },
  { label: "Due Date", value: "7/12/2025" },
  { label: "Status", value: "To Do (default)" },
];

const STATUS_OPTIONS = [
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

const PRIORITY_OPTIONS = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
  { value: "critical", label: "Critical" },
];

function VoiceCaptureCard() {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [draftTask, setDraftTask] = useState(null);
  const { createTask } = useTasksStore();

  const recogniserRef = useRef(null);

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition;
    if (!SpeechRecognition) {
      alert("Unable to start speech recording. Browser not supportted.");
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (event) => {
      const text = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");

      setTranscript(text);
    };
    rec.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };
    rec.onend = () => {
      setIsRecording(false);
    };
    rec.start();
    recogniserRef.current = rec;
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsLoading(true);
    recogniserRef.current?.stop();
    setIsRecording(false);
    processTranscript(transcript);
  };

  const processTranscript = async (text) => {
    try {
      const res = await tasksService.sendTranscript(text);
      console.log("Received response:", res);
      setDraftTask(normalizeTask(res));
      setShowModal(true);
      setIsLoading(false);
      setTranscript("");
    } catch (err) {
      console.error("Failed to process voice transcript", err);
      setIsLoading(false);
    }
  };

  const saveTask = async () => {
    try {
      await createTask(draftTask);
      setShowModal(false);
      setDraftTask(null);
      setTranscript("");
    } catch (err) {
      console.error("Failed to save task", err);
    }
  };

  const handleFieldChange = (field, value) => {
    setDraftTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const normalizeTask = (task) => {
    const normalizeStatus = (val) => {
      const value =
        (val || "").toString().toLowerCase().replace(/\s+/g, "_") || "todo";
      return STATUS_OPTIONS.some((opt) => opt.value === value) ? value : "todo";
    };

    const normalizePriority = (val) => {
      const value = (val || "").toString().toLowerCase();
      return PRIORITY_OPTIONS.some((opt) => opt.value === value)
        ? value
        : "medium";
    };

    const normalizeDate = (val) => {
      if (!val) return "";
      const date = new Date(val);
      if (isNaN(date.getTime())) return "";
      return date.toISOString().split("T")[0];
    };

    return {
      title: task?.title || "",
      description: task?.description || "",
      status: normalizeStatus(task?.status),
      priority: normalizePriority(task?.priority),
      dueDate: normalizeDate(task?.dueDate),
    };
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body space-y-4">
        <div>
          <span className="badge badge-soft badge-primary">Voice capture</span>
        </div>
        <div>
          <h3 className="card-title text-2xl">Add a task by speaking</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={startRecording}
          >
            Start recording
          </button>
          <button
            type="button"
            className="btn btn-outline btn-error"
            onClick={stopRecording}
          >
            Stop
          </button>
        </div>
        <div>
          {(transcript || isRecording) && (
            <div className="p-4 border border-base-300 rounded-lg bg-base-200/60 min-h-[80px]">
              <p className="whitespace-pre-wrap">
                {transcript || "Listening..."}
              </p>
            </div>
          )}
          {isLoading && <div className="mt-2">Processing transcript...</div>}
        </div>
        <div className="rounded-xl border border-dashed border-base-300 bg-base-200/60 p-4 space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-base-content/70">
            Example prompt
          </p>
          <p className="font-semibold leading-relaxed">
            "Create a high priority task to review the pull request for the
            authentication module by tomorrow evening."
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {sampleFields.map((field) => (
              <div
                key={field.label}
                className="rounded-lg bg-base-100 border border-base-300 p-3 space-y-1"
              >
                <p className="text-xs uppercase tracking-[0.1em] text-base-content/60">
                  {field.label}
                </p>
                <p className="font-semibold">{field.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && draftTask && (
        <div className="modal modal-open">
          <div className="modal-box space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg">Review task</h3>
                <p className="text-sm text-base-content/70">
                  Edit the parsed task before saving.
                </p>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="space-y-7">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text text-xs uppercase tracking-[0.12em]">
                      Title
                    </span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={draftTask.title}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                  />
                </label>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text text-xs uppercase tracking-[0.12em]">
                      Description
                    </span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered min-h-[100px]"
                    value={draftTask.description}
                    onChange={(e) =>
                      handleFieldChange("description", e.target.value)
                    }
                  />
                </label>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text text-xs uppercase tracking-[0.12em]">
                      Status
                    </span>
                  </div>
                  <select
                    className="select select-bordered"
                    value={draftTask.status}
                    onChange={(e) =>
                      handleFieldChange("status", e.target.value)
                    }
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text text-xs uppercase tracking-[0.12em]">
                      Priority
                    </span>
                  </div>
                  <select
                    className="select select-bordered"
                    value={draftTask.priority}
                    onChange={(e) =>
                      handleFieldChange("priority", e.target.value)
                    }
                  >
                    {PRIORITY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="form-control">
                  <div className="label">
                    <span className="label-text text-xs uppercase tracking-[0.12em]">
                      Due date
                    </span>
                  </div>
                  <input
                    type="date"
                    className="input input-bordered"
                    value={draftTask.dueDate}
                    onChange={(e) =>
                      handleFieldChange("dueDate", e.target.value)
                    }
                  />
                </label>
              </div>
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveTask}
              >
                Save
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/60"></div>
        </div>
      )}
    </div>
  );
}

export default VoiceCaptureCard;
