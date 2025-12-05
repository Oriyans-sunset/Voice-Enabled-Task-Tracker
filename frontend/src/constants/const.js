const priorityTone = {
  critical: "bg-red-600/10 text-red-600",
  high: "bg-orange-600/10 text-orange-600",
  medium: "bg-yellow-400/10 text-yellow-400",
  low: "bg-sky-600/10 text-sky-600",
};

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

const BASE_API_URL = "http://localhost:3000";

export { priorityTone, STATUS, PRIORITY, BASE_API_URL };
