import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { useTasks } from "./hooks/useTasks";
import { Task } from "./types/task";

jest.mock("./components/taskForm", () => ({
  __esModule: true,
  default: ({ onAddTask }: { onAddTask: (title: string) => void }) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAddTask("Tarefa");
      }}
    >
      <input placeholder="Nova tarefa" />
      <button type="submit">Adicionar</button>
    </form>
  ),
}));

jest.mock("./components/taskCounter", () => ({
  __esModule: true,
  default: ({ count }: { count: number }) => (
    <div>Tarefas pendentes: {count}</div>
  ),
}));

jest.mock("./components/taskFilter", () => ({
  __esModule: true,
  default: ({ currentFilter, onFilterChange }: any) => (
    <div>
      <button onClick={() => onFilterChange("all")}>Todas</button>
      <button onClick={() => onFilterChange("active")}>Ativas</button>
      <button onClick={() => onFilterChange("completed")}>Concluídas</button>
    </div>
  ),
}));

jest.mock("./components/task/taskList", () => ({
  __esModule: true,
  default: ({ tasks }: { tasks: Task[] }) => (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  ),
}));

jest.mock("./hooks/useTasks");

const mockUseTasks = useTasks as jest.MockedFunction<typeof useTasks>;

describe("Component: App", () => {
  const mockTasks: Task[] = [
    {
      id: "1",
      title: "Item 1",
      completed: false,
      createdAt: "",
      updatedAt: "",
    },
    { id: "2", title: "Item 2", completed: true, createdAt: "", updatedAt: "" },
  ];

  beforeEach(() => {
    mockUseTasks.mockReturnValue({
      tasks: mockTasks,
      pendingTasksCount: 1,
      isLoading: false,
      error: null,
      filter: "all",
      setFilter: jest.fn(),
      addTask: jest.fn(),
      toggleTask: jest.fn(),
      updateTaskTitle: jest.fn(),
      deleteTask: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the title", () => {
    render(<App />);

    expect(screen.getByText("Lista de Tarefas")).toBeInTheDocument();
  });

  it("should show loading state when isLoading is true", () => {
    mockUseTasks.mockReturnValue({
      ...mockUseTasks(),
      isLoading: true,
    });

    render(<App />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should show error message when there is an error", () => {
    const errorMessage = "Falha ao carregar tarefas";

    mockUseTasks.mockReturnValue({
      ...mockUseTasks(),
      error: new Error(errorMessage),
    });

    render(<App />);

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it("should render TaskForm component", () => {
    render(<App />);

    expect(screen.getByPlaceholderText("Nova tarefa")).toBeInTheDocument();

    expect(screen.getByText("Adicionar")).toBeInTheDocument();
  });

  it("should render TaskCounter with correct count", () => {
    render(<App />);

    expect(screen.getByText(/Tarefas pendentes: 1/)).toBeInTheDocument();
  });

  it("should render TaskFilter with all buttons", () => {
    render(<App />);

    expect(screen.getByText("Todas")).toBeInTheDocument();
    expect(screen.getByText("Ativas")).toBeInTheDocument();
    expect(screen.getByText("Concluídas")).toBeInTheDocument();
  });

  it("should render TaskList with tasks", () => {
    render(<App />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("should call addTask when form is submitted", async () => {
    const mockAddTask = jest.fn();

    mockUseTasks.mockReturnValue({
      ...mockUseTasks(),
      addTask: mockAddTask,
    });

    render(<App />);

    fireEvent.click(screen.getByText("Adicionar"));

    await waitFor(() => {
      expect(mockAddTask).toHaveBeenCalledWith("Tarefa");
    });
  });

  it("should call setFilter when filter button is clicked", () => {
    const mockSetFilter = jest.fn();

    mockUseTasks.mockReturnValue({
      ...mockUseTasks(),
      setFilter: mockSetFilter,
    });

    render(<App />);

    fireEvent.click(screen.getByText("Ativas"));

    expect(mockSetFilter).toHaveBeenCalledWith("active");
  });
});
