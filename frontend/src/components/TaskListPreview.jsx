const priorityTone = {
  urgent: "badge-error",
  high: "badge-error",
  medium: "badge-warning",
  low: "badge-success",
};

const fallbackTasks = [
  {
    title: "Review authentication PR",
    status: "To Do",
    priority: "High",
    due: "Tomorrow · 6:00 PM",
    assignee: "You",
  },
  {
    title: "Draft QA checklist",
    status: "To Do",
    priority: "Medium",
    due: "Fri · 2:00 PM",
    assignee: "QA",
  },
  {
    title: "Refine dashboard copy",
    status: "In Progress",
    priority: "Low",
    due: "Today · 4:30 PM",
    assignee: "Product",
  },
  {
    title: "Sync with backend team",
    status: "Done",
    priority: "Medium",
    due: "Yesterday",
    assignee: "Frontend",
  },
];

function TaskListPreview({ tasks = fallbackTasks }) {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="text-xs uppercase tracking-[0.08em]">
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Due date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={`${task.title}-${task.status}`}>
                <td className="font-semibold">{task.title}</td>
                <td>
                  <span className="badge badge-outline badge-dash">
                    {task.status}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      priorityTone[task.priority.toLowerCase()] ?? "badge-info"
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="text-base-content/70">{task.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskListPreview;
