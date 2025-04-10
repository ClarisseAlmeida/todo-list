import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "./taskItem";
import { Task } from "../../types/task";

const mockTask: Task = {
  id: "1",
  title: "Item",
  completed: false,
  createdAt: "2025-04-09",
  updatedAt: "2025-04-09",
};

describe("Component: TaskItem", () => {
  it("should render the task title", () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={() => {}}
        onUpdate={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText("Item")).toBeInTheDocument();
  });

  it("should toggle completion status when checkbox is clicked", () => {
    const mockToggle = jest.fn();

    render(
      <TaskItem
        task={mockTask}
        onToggle={mockToggle}
        onUpdate={() => {}}
        onDelete={() => {}}
      />
    );

    fireEvent.click(screen.getByRole("checkbox"));

    expect(mockToggle).toHaveBeenCalledWith("1");
  });

  it("should go into edit mode when double clicked", () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={() => {}}
        onUpdate={() => {}}
        onDelete={() => {}}
      />
    );

    fireEvent.doubleClick(screen.getByText("Item"));

    expect(screen.getByDisplayValue("Item")).toBeInTheDocument();
  });
});
