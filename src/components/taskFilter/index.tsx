import { TaskFilters } from "../../types/task";
import Button from "../common/button";
import "./index.css";

interface TaskFilterProps {
  currentFilter: TaskFilters;
  onFilterChange: (filter: TaskFilters) => void;
}

const TaskFilter = ({ currentFilter, onFilterChange }: TaskFilterProps) => {
  const filters: TaskFilters[] = ["all", "active", "completed"];

  const filterLabels: Record<TaskFilters, string> = {
    all: "Todas ",
    active: "Ativas",
    completed: "Concluídas",
  };

  return (
    <section className="taskFilter">
      {filters.map((filter) => (
        <Button
          key={filter}
          onClick={() => onFilterChange(filter)}
          variant="filter"
          active={filter === currentFilter}
        >
          {filterLabels[filter]}
        </Button>
      ))}
    </section>
  );
};

export default TaskFilter;
