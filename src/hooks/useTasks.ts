import { useState, useEffect, useCallback } from "react";
import { taskService } from "../services/taskService";
import { Task, TaskFilters } from "../types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilters>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadTasks = useCallback(async () => {
    setIsLoading(true);

    try {
      const loadedTasks = await taskService.getTasks();

      setTasks(loadedTasks);

      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async (title: string) => {
    try {
      const newTask = await taskService.createTask(title);

      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      setError(err as Error);
    }
  };

  const toggleTask = async (id: string) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === id);

      if (!taskToUpdate) return;

      const updatedTask = await taskService.updateTask(id, {
        completed: !taskToUpdate.completed,
      });

      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      setError(err as Error);
    }
  };

  const updateTaskTitle = async (id: string, newTitle: string) => {
    try {
      const updatedTask = await taskService.updateTask(id, { title: newTitle });

      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      setError(err as Error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      setError(err as Error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;

    if (filter === "completed") return task.completed;
    
    return true;
  });

  const pendingTasksCount = tasks.filter((task) => !task.completed).length;

  return {
    tasks: filteredTasks,
    pendingTasksCount,
    isLoading,
    error,
    filter,
    setFilter,
    addTask,
    toggleTask,
    updateTaskTitle,
    deleteTask,
  };
}
