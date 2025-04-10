import { renderHook, act } from "@testing-library/react";
import { useTasks } from "./useTasks";
import { taskService } from "../services/taskService";
import { Task, TaskFilters } from "../types/task";

jest.mock("../services/taskService");

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Item 1",
    completed: false,
    createdAt: "2025-04-09",
    updatedAt: "2025-04-09",
  },
  {
    id: "2",
    title: "Item 2",
    completed: true,
    createdAt: "2025-04-09",
    updatedAt: "2025-04-09",
  },
];

describe("Hook: useTasks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should start with loading state and then load tasks", async () => {
    (taskService.getTasks as jest.Mock).mockResolvedValue(mockTasks);

    const { result } = renderHook(() => useTasks());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.tasks).toEqual([]);
    expect(result.current.error).toBeNull();

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.tasks).toEqual(mockTasks);
  });

  it("should handle error when loading tasks", async () => {
    const error = new Error("Erro de conexão");

    (taskService.getTasks as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toEqual(error);
    expect(result.current.tasks).toEqual([]);
  });

  it("should add a new task correctly", async () => {
    (taskService.getTasks as jest.Mock).mockResolvedValue([]);

    const newTask: Task = {
      id: "3",
      title: "Item 3",
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    (taskService.createTask as jest.Mock).mockResolvedValue(newTask);

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await result.current.addTask("Item 3");
    });

    expect(taskService.createTask).toHaveBeenCalledWith("Item 3");
    expect(result.current.tasks).toContainEqual(newTask);
  });

  
  it("should toggle the completion status of a task", async () => {
    (taskService.getTasks as jest.Mock).mockResolvedValue(mockTasks);

    const updatedTask = { ...mockTasks[0], completed: true };

    (taskService.updateTask as jest.Mock).mockResolvedValue(updatedTask);

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      await result.current.toggleTask("1");
    });

    expect(taskService.updateTask).toHaveBeenCalledWith("1", {
      completed: true,
    });
    expect(result.current.tasks.find((t) => t.id === "1")?.completed).toBe(
      true
    );
  });

  it("should update the title of a task", async () => {
    (taskService.getTasks as jest.Mock).mockResolvedValue(mockTasks);

    const updatedTask = { ...mockTasks[0], title: "Título atualizado" };
    
    (taskService.updateTask as jest.Mock).mockResolvedValue(updatedTask);

    const { result } = renderHook(() => useTasks());
    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      await result.current.updateTaskTitle("1", "Título atualizado");
    });

    expect(taskService.updateTask).toHaveBeenCalledWith("1", {
      title: "Título atualizado",
    });
    expect(result.current.tasks.find((t) => t.id === "1")?.title).toBe(
      "Título atualizado"
    );
  });

  it("should delete an existing task", async () => {
    (taskService.getTasks as jest.Mock).mockResolvedValue(mockTasks);

    (taskService.deleteTask as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useTasks());
    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      await result.current.deleteTask("1");
    });

    expect(taskService.deleteTask).toHaveBeenCalledWith("1");
    expect(result.current.tasks.some((t) => t.id === "1")).toBe(false);
  });

  it("should filter tasks correctly", async () => {
    (taskService.getTasks as jest.Mock).mockResolvedValue(mockTasks);

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.tasks.length).toBe(2);

    act(() => {
      result.current.setFilter("active");
    });

    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].completed).toBe(false);

    act(() => {
      result.current.setFilter("completed");
    });

    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].completed).toBe(true);
  });

  it("should correctly calculate the pending tasks counter", async () => {
    (taskService.getTasks as jest.Mock).mockResolvedValue(mockTasks);

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.pendingTasksCount).toBe(1);
  });
});
