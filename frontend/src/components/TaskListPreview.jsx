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
  { title: "Draft QA checklist", status: "To Do", priority: "Medium", due: "Fri · 2:00 PM", assignee: "QA" },
  {
    title: "Refine dashboard copy",
    status: "In Progress",
    priority: "Low",
    due: "Today · 4:30 PM",
    assignee: "Product",
  },
  { title: "Sync with backend team", status: "Done", priority: "Medium", due: "Yesterday", assignee: "Frontend" },
];

function TaskListPreview({ tasks = fallbackTasks }) {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body gap-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-base-content/60">List view</p>
            <p className="text-base-content/70">Compact table for search and bulk edits</p>
          </div>
          <span className="badge badge-outline badge-neutral">Static preview</span>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr className="text-xs uppercase tracking-[0.08em]">
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Due date</th>
                <th>Assignee</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={`${task.title}-${task.status}`}>
                  <td className="font-semibold">{task.title}</td>
                  <td>
                    <span className="badge badge-outline badge-neutral">{task.status}</span>
                  </td>
                  <td>
                    <span className={`badge ${priorityTone[task.priority.toLowerCase()] ?? "badge-info"}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="text-base-content/70">{task.due}</td>
                  <td className="text-base-content/70">{task.assignee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TaskListPreview;
