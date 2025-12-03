export default class TasksService {
  async fetchTasks() {
    const response = await fetch("/tasks");
    if (!response.ok) {
      throw new Error(await this._getErrorMessage(response));
    }
    return response.json();
  }

  async fetchTaskById(taskId) {
    const response = await fetch(`/tasks/${taskId}`);
    if (!response.ok) {
      throw new Error(await this._getErrorMessage(response));
    }
    return response.json();
  }

  async createTask(taskData) {
    const response = await fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error(await this._getErrorMessage(response));
    }
    return response.json();
  }

  async updateTask(taskId, updatedData) {
    const response = await fetch(`/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error(await this._getErrorMessage(response));
    }
    return response.json();
  }

  async deleteTask(taskId) {
    const response = await fetch(`/tasks/${taskId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(await this._getErrorMessage(response));
    }
  }

  async _getErrorMessage(response) {
    try {
      const data = await response.json();
      return data?.message;
    } catch {
      return `HTTP ${response.status}`;
    }
  }
}
