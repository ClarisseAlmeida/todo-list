import React from "react";
import { Task } from "../../types/task";
import TaskItem from "./taskItem";
import "./taskList.css";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}

const TaskList = ({ tasks, onToggle, onUpdate, onDelete }: TaskListProps) => {
  if (tasks.length === 0) {
    return <p className="taskList-text">Nenhuma tarefa encontrada</p>;
  }

  return (
    <ul className="taskList-list">
      {[...tasks].reverse().map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
