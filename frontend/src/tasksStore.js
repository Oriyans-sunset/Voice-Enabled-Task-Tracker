import { create } from "zustand";
import { tasksService } from "./services/tasksService";

export const useTasksStore = create((set, get) => ({
  // state variables
  tasks: [],
  loading: false,
  error: null,

  // fetch all tasks, store them in zustand
  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const tasks = await tasksService.fetchTasks();
      set({ tasks, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to fetch tasks",
        loading: false,
      });
    }
  },

  // create new task on backend, then refetch list
  createTask: async (taskData) => {
    set({ loading: true, error: null });
    try {
      await tasksService.createTask(taskData);
      await get().fetchTasks();
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to create task",
        loading: false,
      });
    }
  },

  // update task on backend, then refetch list
  updateTask: async (taskId, updatedData) => {
    set({ loading: true, error: null });
    try {
      await tasksService.updateTask(taskId, updatedData);
      await get().fetchTasks();
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to update task",
        loading: false,
      });
    }
  },

  // delete task on backend, then refetch list
  deleteTask: async (taskId) => {
    set({ loading: true, error: null });
    try {
      await tasksService.deleteTask(taskId);
      await get().fetchTasks();
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to delete task",
        loading: false,
      });
    }
  },

  // move a task between columns without a full refetch
  moveTask: async (taskId, newStatus) => {
    const previousTasks = get().tasks;
    const exists = previousTasks.some((task) => task.id === taskId);
    if (!exists) return;

    const updatedTasks = previousTasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    set({ tasks: updatedTasks, error: null });

    try {
      await tasksService.updateTask(taskId, { status: newStatus });
    } catch (err) {
      set({
        tasks: previousTasks,
        error:
          err instanceof Error ? err.message : "Failed to move task to column",
      });
    }
  },
}));
