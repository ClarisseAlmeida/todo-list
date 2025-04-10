import "./index.css";

interface TaskCounterProps {
  count: number;
}

const TaskCounter = ({ count }: TaskCounterProps) => {
  return <section className="taskCounter">Tarefas pendentes: {count}</section>;
};

export default TaskCounter;
