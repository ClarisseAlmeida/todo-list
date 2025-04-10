import { useTasks } from "./hooks/useTasks";
import TaskForm from "./components/taskForm";
import TaskCounter from "./components/taskCounter";
import TaskFilter from "./components/taskFilter";
import TaskList from "./components/task/taskList";
import "./App.css";

const App = () => {
  const {
    tasks,
    pendingTasksCount,
    isLoading,
    error,
    filter,
    setFilter,
    addTask,
    toggleTask,
    updateTaskTitle,
    deleteTask,
  } = useTasks();

  if (isLoading) return <div className="">Loading...</div>;
  if (error) return <div className="">Error: {error.message}</div>;

  return (
    <main className="app">
      <h1 className="app-title">Lista de Tarefas</h1>
      <div className="app-container">
        <TaskForm onAddTask={addTask} />
        <TaskCounter count={pendingTasksCount} />
        <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onUpdate={updateTaskTitle}
          onDelete={deleteTask}
        />
      </div>
    </main>
  );
};

export default App;
