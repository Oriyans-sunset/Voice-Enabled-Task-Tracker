import { useEffect, useState } from "react";
import { priorityTone } from "../constants/const";
import { useTasksStore } from "../tasksStore";

const STATUS = [
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

const PRIORITY = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

const EMPTY_FORM = {
  title: "",
  description: "",
  status: "todo",
  priority: "",
  dueDate: "",
};

function TaskListView({ tasks }) {
  const updateTask = useTasksStore((state) => state.updateTask);
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    if (!selectedTask) {
      setFormData(EMPTY_FORM);
      setSaveError("");
      return;
    }
    setFormData({
      title: selectedTask.title || "",
      description: selectedTask.description || "",
      status: selectedTask.statusRaw || "todo",
      priority: selectedTask.priorityRaw || "",
      dueDate: toDateInputValue(selectedTask.dueRaw),
    });
    setSaveError("");
  }, [selectedTask]);

  const handleDelete = async () => {
    if (!selectedTask) return;
    setSaving(true);
    setSaveError("");
    try {
      await deleteTask(selectedTask.id);
      setSelectedTask(null);
    } catch (err) {
      setSaveError(
        err instanceof Error ? err.message : "Failed to delete the task"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (!selectedTask) return;
    if (!formData.title.trim()) {
      setSaveError("Title is required");
      return;
    }
    setSaving(true);
    setSaveError("");
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority || null,
        dueDate: formData.dueDate
          ? new Date(formData.dueDate).toISOString()
          : null,
      };
      await updateTask(selectedTask.id, payload);
      setSelectedTask(null);
    } catch (err) {
      setSaveError(
        err instanceof Error ? err.message : "Failed to update the task"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr className="text-xs uppercase tracking-[0.08em]">
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Due date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id ?? `${task.title}-${task.status}`}
                  className="cursor-pointer hover:bg-base-200/60"
                  onClick={() => setSelectedTask(task)}
                >
                  <td className="font-semibold">{task.title}</td>
                  <td className="align-top w-48">
                    <p className="text-sm text-base-content/70 whitespace-normal break-words">
                      {!task.description ? "-" : task.description}
                    </p>
                  </td>
                  <td>
                    <span className="badge badge-outline">{task.status}</span>
                  </td>

                  <td>
                    {task.priority ? (
                      <span
                        className={`badge badge-sm ${
                          priorityTone[task.priority.toLowerCase()]
                        }`}
                      >
                        {task.priority}
                      </span>
                    ) : (
                      <span className="badge badge-sm badge-ghost">
                        No-Priority
                      </span>
                    )}
                  </td>
                  <td className="text-base-content/70">
                    {!task.due ? "No due date" : task.due}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTask ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="card w-full max-w-2xl bg-base-100 shadow-2xl border border-base-300">
            <div className="card-body gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="card-title">Edit task</h3>
                </div>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setSelectedTask(null)}
                >
                  ✕
                </button>
              </div>

              {saveError ? (
                <div className="alert alert-error py-2 text-sm">
                  {saveError}
                </div>
              ) : null}

              <div className="grid gap-5 md:grid-cols-2 flex-1 w-full">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Title</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Description</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered min-h-24"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Status</span>
                  </div>
                  <select
                    className="select select-bordered"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                  >
                    {STATUS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Priority</span>
                  </div>
                  <select
                    className="select select-bordered"
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }))
                    }
                  >
                    {PRIORITY.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Due date</span>
                  </div>
                  <input
                    type="date"
                    className="input input-bordered"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        dueDate: e.target.value,
                      }))
                    }
                  />
                </label>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  className="btn btn-ghost"
                  onClick={() => setSelectedTask(null)}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-error"
                  onClick={handleDelete}
                  disabled={saving}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function toDateInputValue(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

export default TaskListView;
