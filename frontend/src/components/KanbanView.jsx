import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { priorityTone } from "../constants/const";

const COLUMN_ORDER = ["todo", "in_progress", "done"];

function KanbanView({ board }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {COLUMN_ORDER.map((columnId) => {
        const column = board[columnId] || { title: "", tasks: [] };
        return (
          <KanbanColumn
            key={columnId}
            columnId={columnId}
            title={column.title}
            tasks={column.tasks}
          />
        );
      })}
    </div>
  );
}

function KanbanColumn({ columnId, title, tasks = [] }) {
  const { setNodeRef, isOver } = useDroppable({ id: columnId });

  return (
    <div
      ref={setNodeRef}
      className={`card bg-base-100 border border-base-300 shadow-lg transition-colors ${
        isOver ? "border-primary bg-primary/5" : ""
      }`}
    >
      <div className="card-body gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="badge badge-ghost">{title}</span>
            <span className="badge badge-sof">{tasks.length}</span>
          </div>
        </div>
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-sm text-base-content/60">Drop tasks here</p>
          ) : (
            tasks.map((task) => <KanbanCard key={task.id} task={task} />)
          )}
        </div>
      </div>
    </div>
  );
}

// Fixed errors in this compoenent using Claude
function KanbanCard({ task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: String(task.id),
      data: {
        status: task.status,
      },
    });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    touchAction: "none",
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`card bg-base-200 border border-base-300 shadow-sm cursor-grab ${
        isDragging ? "opacity-70 ring-2 ring-primary ring-offset-2" : ""
      }`}
      {...listeners}
      {...attributes}
    >
      <div className="card-body gap-2">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold leading-tight">{task.title}</p>
          {task.priority ? (
            <span
              className={`badge badge-sm ${
                priorityTone[task.priority.toLowerCase()]
              }`}
            >
              {task.priority}
            </span>
          ) : (
            <span className="badge badge-sm badge-ghost">No-Priority</span>
          )}
        </div>
        <p className="text-sm text-base-content/70">{task.description}</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="badge badge-outline badge-soft">
            {!task.due ? "No due date" : task.due}
          </span>
        </div>
      </div>
    </article>
  );
}

export default KanbanView;
