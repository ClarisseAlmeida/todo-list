import {
  getLocalStorageTasks,
  setLocalStorageTasks,
  createLocalTask,
} from "./storage";
import { Task } from "../types/task";

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

const consoleErrorMock = jest
  .spyOn(console, "error")
  .mockImplementation(() => {});

beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
});

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe("storage utilities", () => {
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

  describe("getLocalStorageTasks", () => {
    it("should return empty array when no tasks in localStorage", () => {
      const result = getLocalStorageTasks();

      expect(result).toEqual([]);
      expect(consoleErrorMock).not.toHaveBeenCalled();
    });

    it("should return parsed tasks when tasks exist in localStorage", () => {
      localStorage.setItem("tasks", JSON.stringify(mockTasks));

      const result = getLocalStorageTasks();

      expect(result).toEqual(mockTasks);
    });

    it("should return empty array and log error when JSON is invalid", () => {
      localStorage.setItem("tasks", "invalid json");

      const result = getLocalStorageTasks();

      expect(result).toEqual([]);
      expect(consoleErrorMock).toHaveBeenCalled();
    });
  });

  describe("setLocalStorageTasks", () => {
    it("should save tasks to localStorage", () => {
      setLocalStorageTasks(mockTasks);

      expect(localStorage.getItem("tasks")).toBe(JSON.stringify(mockTasks));

      expect(consoleErrorMock).not.toHaveBeenCalled();
    });

    it("should log error when saving fails", () => {
      jest.spyOn(localStorage, "setItem").mockImplementationOnce(() => {
        throw new Error("Falha ao salvar");
      });

      setLocalStorageTasks(mockTasks);

      expect(consoleErrorMock).toHaveBeenCalled();
    });
  });
});
