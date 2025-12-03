import { useEffect, useMemo } from "react";
import FilterBar from "../components/FilterBar";
import SectionHeader from "../components/SectionHeader";
import KanbanView from "../components/KanbanView";
import TaskComposerCard from "../components/TaskComposerCard";
import TaskListView from "../components/TaskListView";
import VoiceCaptureCard from "../components/VoiceCaptureCard";
import { useTasksStore } from "../tasksStore";
import { DndContext } from "@dnd-kit/core";

function Home() {
  const tasks = useTasksStore((state) => state.tasks);
  const loading = useTasksStore((state) => state.loading);
  const error = useTasksStore((state) => state.error);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const board = useMemo(() => {
    const result = { "To Do": [], "In Progress": [], Done: [] };
    tasks.forEach((task) => {
      const status = ["todo", "in_progress", "done"].includes(task.status)
        ? task.status
        : "todo";
      const column =
        status === "in_progress"
          ? "In Progress"
          : status === "done"
          ? "Done"
          : "To Do";
      result[column].push({
        title: task.title,
        description: task.description || "",
        priority: formatLabel(task.priority) || "",
        due: task.dueDate ? formatDate(task.dueDate) : "",
      });
    });
    return result;
  }, [tasks]);

  const list = useMemo(() => {
    return tasks.map((task) => ({
      title: task.title,
      description: task.description || "",
      status:
        task.status === "in_progress"
          ? "In Progress"
          : task.status === "done"
          ? "Done"
          : "To Do",
      priority: formatLabel(task.priority) || "",
      due: task.dueDate ? formatDate(task.dueDate) : "",
    }));
  }, [tasks]);

  return (
    <div className="space-y-12">
      <section className="grid gap-6 lg:grid-cols-2">
        <VoiceCaptureCard />
        <TaskComposerCard />
      </section>

      <section className="space-y-4">
        <SectionHeader title="Kanban-style Board" />
        {error && <p className="text-error text-sm">{String(error)}</p>}
        {loading ? (
          <p className="text-sm opacity-70">Loading board...</p>
        ) : (
          <DndContext>
            <KanbanView board={board} />
          </DndContext>
        )}
      </section>

      <section className="space-y-4">
        <SectionHeader title="List view" actionSlot={<FilterBar />} />
        {loading ? (
          <p className="text-sm opacity-70">Loading list...</p>
        ) : (
          <TaskListView tasks={list} />
        )}
      </section>
    </div>
  );
}

// just so we can convert raw values to more formatted labels,
// just for UI totally optional (eg, in_progress -> In Progress)
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
