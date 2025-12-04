import { priorityTone } from "../constants/const";

function TaskListView({ tasks }) {
  return (
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
              <tr key={`${task.title}-${task.status}`}>
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
  );
}

export default TaskListView;
