function TaskComposerCard() {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body space-y-4">
        <div className="flex items-center justify-between gap-3">
          <span className="badge badge-primary badge-outline">Manual entry</span>
          <p className="text-xs uppercase tracking-[0.14em] text-base-content/60">Structure only — wire up logic later</p>
        </div>
        <div className="space-y-2">
          <h3 className="card-title text-2xl">Type a task instead</h3>
          <p className="text-base-content/70">
            Provide the task details by hand. Hook your state handlers, validations, and submit logic later on.
          </p>
        </div>
        <div className="space-y-3">
          <label className="form-control">
            <div className="label">
              <span className="label-text text-xs uppercase tracking-[0.12em]">Title</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              placeholder="Review pull request for authentication module"
              readOnly
            />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text text-xs uppercase tracking-[0.12em]">Description</span>
            </div>
            <textarea
              rows="3"
              className="textarea textarea-bordered"
              placeholder="Add context, links, or acceptance criteria"
              readOnly
            />
          </label>
          <div className="grid gap-3 md:grid-cols-3">
            <label className="form-control">
              <div className="label">
                <span className="label-text text-xs uppercase tracking-[0.12em]">Status</span>
              </div>
              <select className="select select-bordered" defaultValue="todo" disabled>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text text-xs uppercase tracking-[0.12em]">Priority</span>
              </div>
              <select className="select select-bordered" defaultValue="high" disabled>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text text-xs uppercase tracking-[0.12em]">Due date</span>
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
