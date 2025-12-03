function TaskComposerCard() {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 h-full">
      <div className="card-body space-y-4 h-full flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <span className="badge badge-soft badge-primary">Manual entry</span>
        </div>
        <div className="space-y-2">
          <h3 className="card-title text-2xl">Type a task instead</h3>
        </div>
        <div className="space-y-3 flex-1 flex flex-col items-start">
          <div className="grid gap-3 md:grid-cols-2 flex-1">
            <div className="label">
              <span className="label-text text-xs uppercase tracking-[0.12em]">
                Title
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                className="input input-bordered"
                placeholder="Enter task title here"
                readOnly
              />
            </div>

            <div className="label">
              <span className="label-text text-xs uppercase tracking-[0.12em]">
                Description
              </span>
            </div>
            <div className="flex flex-col h-full">
              <textarea
                className="textarea textarea-bordered flex-1 min-h-0"
                placeholder="Add any additional details about the task here"
                readOnly
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
                defaultValue="todo"
                disabled
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
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
                defaultValue="high"
                disabled
              >
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text text-xs uppercase tracking-[0.12em]">
                  Due date
                </span>
              </div>
              <input type="date" className="input input-bordered" readOnly />
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button type="button" className="btn btn-ghost">
            Reset fields
          </button>
          <button type="button" className="btn btn-primary">
            Save task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskComposerCard;
