import React from "react";
import { render, screen } from "@testing-library/react";
import TaskList from "./taskList";
import { Task } from "../../types/task";

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
    completed: false,
    createdAt: "2025-04-09",
    updatedAt: "2025-04-09",
  },
];

describe("Component: TaskList", () => {
  it("should render task list", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onToggle={() => {}}
        onUpdate={() => {}}
        onDelete={() => {}}
      />
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("should show message when there are no tasks", () => {
    render(
      <TaskList
        tasks={[]}
        onToggle={() => {}}
        onUpdate={() => {}}
        onDelete={() => {}}
      />
    );
    expect(screen.getByText("Nenhuma tarefa encontrada")).toBeInTheDocument();
  });
});
