import React, { memo, useState } from "react";
import { Task } from "../../types/task";
import Checkbox from "../common/checkbox";
import Input from "../common/input";
import Button from "../common/button";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";
import "./taskItem.css";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onUpdate: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}

const DeleteIcon = MdDelete as React.ComponentType<{
  size?: number | string;
}>;

const CloseIcon = MdClose as React.ComponentType<{
  size?: number | string;
}>;

const EditIcon = MdEdit as React.ComponentType<{
  size?: number | string;
}>;

const TaskItem = ({ task, onToggle, onUpdate, onDelete }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleUpdate = () => {
    if (editedTitle.trim()) {
      onUpdate(task.id, editedTitle.trim());
    }
    setIsEditing(false);
  };

  const handleEditStart = () => {
    setEditedTitle(task.title);
    setIsEditing(true);
  };

  return (
    <li className="taskItem">
      <div className="taskItem-wrapper">
        <Checkbox
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          label=""
        />
        {isEditing ? (
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(e) => e.key === "Escape" && handleUpdate()}
            autoFocus
          />
        ) : (
          <span
            className={`taskItem-text ${
              task.completed ? "taskItem-text--completed" : ""
            }`}
            onDoubleClick={() => {
              if (!task.completed) {
                handleEditStart();
              }
            }}
          >
            {task.title}
          </span>
        )}
      </div>
      <div className="taskItem-wrapper--buttons">
        <Button
          onClick={handleEditStart}
          variant="icon"
          disabled={task.completed}
        >
          {isEditing ? <CloseIcon size={20} /> : <EditIcon size={20} />}
        </Button>
        <Button
          onClick={() => onDelete(task.id)}
          disabled={isEditing || task.completed}
          variant="icon"
        >
          <DeleteIcon size={20} />
        </Button>
      </div>
    </li>
  );
};

export default memo(TaskItem);
