import { BASE_API_URL } from "../constants/const.js";

export default class TasksService {
  async fetchTasks() {
    const response = await fetch(`${BASE_API_URL}/tasks`);
    if (!response.ok) {
      throw new Error(await this._getErrorMessage(response));
    }
    return response.json();
  }

  async fetchTaskById(taskId) {
    const response = await fetch(`${BASE_API_URL}/tasks/${taskId}`);
    if (!response.ok) {
      throw new Error(await this._getErrorMessage(response));
    }
    return response.json();
  }

  async sendTranscript(text) {
    const response = await fetch(`${BASE_API_URL}/transcripts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transcripts: text }),
    });
    if (!response.ok) {
      throw new Error(await this._getErrorMessage(response));
    }
    return response.json();
  }

  async createTask(taskData) {
    const response = await fetch(`${BASE_API_URL}/tasks`, {
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
    const response = await fetch(`${BASE_API_URL}/tasks/${taskId}`, {
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
    const response = await fetch(`${BASE_API_URL}/tasks/${taskId}`, {
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

export const tasksService = new TasksService();
