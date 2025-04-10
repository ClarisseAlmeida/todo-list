import { fetchClient } from "./apiClient";
import {
  getLocalStorageTasks,
  setLocalStorageTasks,
  createLocalTask,
} from "../../utils/storage";
import { Task } from "../../types/task";

const isApiAvailable = !!process.env.REACT_APP_API_BASE_URL;

export const getTasks = async (): Promise<Task[]> => {
  if (!isApiAvailable) {
    return getLocalStorageTasks();
  }

  try {
    const response = await fetchClient.get<Task[]>("/api/todos");

    return response.data;
  } catch (error) {
    console.error("Falha na API, retornando para localStorage:", error);

    return getLocalStorageTasks();
  }
};

export const createTask = async (title: string): Promise<Task> => {
  if (!isApiAvailable) {
    const tasks = getLocalStorageTasks();

    const newTask = createLocalTask(title);

    setLocalStorageTasks([...tasks, newTask]);

    return newTask;
  }

  try {
    const response = await fetchClient.post<Task>("/api/todos", { title });

    return response.data;
  } catch (error) {
    console.error("Falha na API, retornando para localStorage:", error);

    const tasks = getLocalStorageTasks();

    const newTask = createLocalTask(title);

    setLocalStorageTasks([...tasks, newTask]);

    return newTask;
  }
};

export const updateTask = async (
  id: string,
  updates: Partial<Task>
): Promise<Task> => {
  const tasks = getLocalStorageTasks();

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    throw new Error("Tarefa não encontrada");
  }

  if (!isApiAvailable) {
    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const updatedTasks = [...tasks];

    updatedTasks[taskIndex] = updatedTask;

    setLocalStorageTasks(updatedTasks);

    return updatedTask;
  }

  try {
    const response = await fetchClient.put<Task>(`/api/todos/${id}`, updates);

    return response.data;
  } catch (error) {
    console.error("Falha na API, retornando para localStorage:", error);

    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const updatedTasks = [...tasks];

    updatedTasks[taskIndex] = updatedTask;

    setLocalStorageTasks(updatedTasks);

    return updatedTask;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  const tasks = getLocalStorageTasks();

  if (!isApiAvailable) {
    const filteredTasks = tasks.filter((task) => task.id !== id);

    setLocalStorageTasks(filteredTasks);

    return;
  }

  try {
    await fetchClient.delete<void>(`/api/todos/${id}`);

    const filteredTasks = tasks.filter((task) => task.id !== id);

    setLocalStorageTasks(filteredTasks);
  } catch (error) {
    console.error("Falha na API, retornando para localStorage:", error);

    const filteredTasks = tasks.filter((task) => task.id !== id);

    setLocalStorageTasks(filteredTasks);
  }
};
