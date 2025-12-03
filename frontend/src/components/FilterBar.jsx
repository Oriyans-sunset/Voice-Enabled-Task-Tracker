function FilterBar() {
  return (
    <div className="grid gap-3 lg:grid-cols-4">
      <label className="form-control">
        <div className="label">
          <span className="label-text text-xs uppercase tracking-[0.12em]">
            Status
          </span>
        </div>
        <select
          id="filter-status"
          defaultValue="all"
          className="select select-bordered select-sm md:select-md"
        >
          <option value="all">All</option>
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
          id="filter-priority"
          defaultValue="all"
          className="select select-bordered select-sm md:select-md"
        >
          <option value="all">All</option>
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
        <select
          id="filter-due"
          defaultValue="any"
          className="select select-bordered select-sm md:select-md"
        >
          <option value="any">Any time</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="week">This week</option>
        </select>
      </label>
      <label className="form-control lg:col-span-1">
        <div className="label">
          <span className="label-text text-xs uppercase tracking-[0.12em]">
            Search
          </span>
        </div>
        <label className="input input-bordered flex items-center gap-2">
          <input
            id="filter-search"
            type="search"
            className="grow"
            placeholder="Search title or description"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4 opacity-60"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" />
          </svg>
        </label>
      </label>
    </div>
  );
}

export default FilterBar;
