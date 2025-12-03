const priorityTone = {
  urgent: "badge-error",
  high: "badge-error",
  medium: "badge-warning",
  low: "badge-success",
};

const fallbackBoard = {
  "To Do": [
    {
      title: "Review authentication PR",
      summary: "Ensure new auth flows are covered by tests",
      priority: "High",
      due: "Tomorrow · 6:00 PM",
      owner: "Backend",
    },
    {
      title: "Draft QA checklist",
      summary: "Outline test cases for release candidate",
      priority: "Medium",
      due: "Fri · 2:00 PM",
      owner: "QA",
    },
  ],
  "In Progress": [
    {
      title: "Refine dashboard copy",
      summary: "Tighten microcopy for the task composer",
      priority: "Low",
      due: "Today · 4:30 PM",
      owner: "Product",
    },
  ],
  Done: [
    {
      title: "Sync with backend team",
      summary: "Confirm payload for parsed voice tasks",
      priority: "Medium",
      due: "Yesterday",
      owner: "Frontend",
    },
  ],
};

function TaskBoardPreview({ board = fallbackBoard }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(board).map(([status, tasks]) => (
        <div
          key={status}
          className="card bg-base-100 border border-base-300 shadow-lg"
        >
          <div className="card-body gap-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="badge badge-outline">{status}</span>
                <span className="badge badge-neutral badge-dash">
                  {tasks.length}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {tasks.map((task) => (
                <article
                  key={task.title}
                  className="card bg-base-200 border border-base-300 shadow-sm"
                >
                  <div className="card-body gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold leading-tight">
                        {task.title}
                      </p>
                      <span
                        className={`badge badge-sm ${
                          priorityTone[task.priority.toLowerCase()] ??
                          "badge-info"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-base-content/70">
                      {task.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="badge badge-outline badge-soft">
                        {task.due}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskBoardPreview;
