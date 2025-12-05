import { useState } from "react";
import { useTasksStore } from "../tasksStore";

function TaskComposerCard() {
  const { createTask, loading, error } = useTasksStore();

  // Enums to make sure we use valid values in paylaod
  const STATUS = ["todo", "in_progress", "done"];
  const UI_STATUS = [
    { value: "todo", label: "To Do" },
    { value: "in_progress", label: "In Progress" },
    { value: "done", label: "Done" },
  ];
  const PRIORITY = ["low", "medium", "high", "critical"];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [success, setSuccess] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("todo");
    setPriority("medium");
    setDueDate("");
    setSuccess(false);
  };

  // just to make sure staus and priority are valid before submission
  const isValidStatus = (val) => STATUS.includes(val);
  const isValidPriority = (val) => PRIORITY.includes(val);

  const handleSubmit = async () => {
    setSuccess(false);

    if (!isValidStatus(status)) return;
    if (!isValidPriority(priority)) return;
    const payload = {
      title: title.trim() || "",
      description: description.trim() || "",
      status: status,
      priority: priority,
      dueDate: dueDate || undefined,
    };
    await createTask(payload);
    if (!error) {
      setSuccess(true);
      resetForm();
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 h-full">
      <div className="card-body space-y-4 h-full flex flex-col">
        <div>
          <span className="badge badge-soft badge-primary">Manual entry</span>
        </div>
        <div>
          <h3 className="card-title text-2xl">Type a task instead</h3>
        </div>
        <div className="space-y-3 flex-1 flex flex-col items-start">
          <div className="grid gap-3 md:grid-cols-2 flex-1 w-full">
            <div className="label">
              <span className="label-text text-xs uppercase tracking-[0.12em]">
                Title
              </span>
            </div>
            <div className="flex flex-col h-ful">
              <input
                type="text"
                className="input input-bordered"
                placeholder="Enter task title here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="label">
              <span className="label-text text-xs uppercase tracking-[0.12em]">
                Description
              </span>
            </div>
            <div className="flex flex-col">
              <textarea
                className="textarea textarea-bordered flex-1 min-h-0"
                placeholder="Add any additional details about the task here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
              />
            </div>
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
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={loading}
              >
                {UI_STATUS.map((options) => (
                  <option key={options.value} value={options.value}>
                    {options.label}
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
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                disabled={loading}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="critical">Critical</option>
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
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                disabled={loading}
              />
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={resetForm}
            disabled={loading}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading || !title.trim()}
          >
            {loading ? "Saving..." : "Save task"}
          </button>
        </div>
        {error && (
          <div className="text-error text-sm">HTTP {String(error)}</div>
        )}
        {success && (
          <div className="text-success text-sm">Task created successfully</div>
        )}
      </div>
    </div>
  );
}

export default TaskComposerCard;
