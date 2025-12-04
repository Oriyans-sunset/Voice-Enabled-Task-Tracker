import { useEffect, useMemo } from "react";
import {
  DndContext,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import KanbanView from "../components/KanbanView";
import TaskComposerCard from "../components/TaskComposerCard";
import TaskListView from "../components/TaskListView";
import VoiceCaptureCard from "../components/VoiceCaptureCard";
import { useTasksStore } from "../tasksStore";

function Home() {
  const tasks = useTasksStore((state) => state.tasks);
  const loading = useTasksStore((state) => state.loading);
  const error = useTasksStore((state) => state.error);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);
  const moveTask = useTasksStore((state) => state.moveTask);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const board = useMemo(() => {
    const result = {
      todo: { title: "To Do", tasks: [] },
      in_progress: { title: "In Progress", tasks: [] },
      done: { title: "Done", tasks: [] },
    };
    tasks.forEach((task) => {
      const status = ["todo", "in_progress", "done"].includes(task.status)
        ? task.status
        : "todo";
      result[status].tasks.push({
        id: task.id,
        title: task.title,
        description: task.description || "",
        priority: formatLabel(task.priority) || "",
        due: task.dueDate ? formatDate(task.dueDate) : "",
        status,
      });
    });
    return result;
  }, [tasks]);

  const list = useMemo(() => {
    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description || "",
      status: getStatusLabel(task.status),
      statusRaw: task.status || "todo",
      priority: formatLabel(task.priority) || "",
      priorityRaw: task.priority || "",
      due: task.dueDate ? formatDate(task.dueDate) : "",
      dueRaw: task.dueDate || "",
    }));
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const fromStatus = active.data.current?.status;
    const toStatus = over.id;

    if (!toStatus || fromStatus === toStatus) return;

    moveTask(Number(active.id), toStatus);
  };

  return (
    <div className="space-y-15">
      <section className="grid gap-6 lg:grid-cols-2">
        <VoiceCaptureCard />
        <TaskComposerCard />
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Kanban-style Board</h2>
          </div>
        </div>
        {error && <p className="text-error text-sm">{String(error)}</p>}
        {loading ? (
          <p className="text-sm opacity-70">Loading board...</p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <KanbanView board={board} />
          </DndContext>
        )}
      </section>

      <section className="space-y-4">
        <TaskListView tasks={list} />
      </section>
    </div>
  );
}

// just so we can convert raw values to more formatted labels,
// just for UI totally optional (eg, in_progress -> In Progress)
function getStatusLabel(status) {
  if (status === "in_progress") return "In Progress";
  if (status === "done") return "Done";
  return "To Do";
}

function formatLabel(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1).replace("_", " ");
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString();
}

export default Home;
