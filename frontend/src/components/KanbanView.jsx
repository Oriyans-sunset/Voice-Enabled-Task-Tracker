import { priorityTone } from "../constants/const";

function KanbanView({ board }) {
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
                <span className="badge badge-ghost">{status}</span>
                <span className="badge badge-sof">{tasks.length}</span>
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
                    </div>
                    <p className="text-sm text-base-content/70">
                      {task.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="badge badge-outline badge-soft">
                        {!task.due ? "No due date" : task.due}
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

export default KanbanView;
