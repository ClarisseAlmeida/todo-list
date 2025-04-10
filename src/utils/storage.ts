import { Task } from "../types/task";

export const getLocalStorageTasks = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem("tasks");

    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error("Erro ao acessar localStorage:", error);
    
    return [];
  }
};

export const setLocalStorageTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Erro ao salvar no localStorage:", error);
  }
};

const generateId = (): string => Math.random().toString(36).substring(2, 9);

export const createLocalTask = (title: string): Task => {
  return {
    id: generateId(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
