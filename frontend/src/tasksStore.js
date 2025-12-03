import { create } from "zustand";
import TasksService from "../src/services/tasksService";

const tasksService = new TasksService();

export const useTasksStore = create((set, get) => ({
  // state variables
  tasks: [],
  loading: false,
  error: null,

  // for list view
  filters: {
    status: null, // "todo" / "in_progress" / "done" / null for all tasks
    priority: null, // "low" / "medium" / "high" / "critical" / null for all tasks
    query: "",
  },

  setFilters: (partialFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...partialFilters,
      },
    })),

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

  // gets tasks filtered on the frontend
  getFilteredTasks: () => {
    const { tasks, filters } = get();
    return filterTasks(tasks, filters);
  },
}));
