import React from 'react';
import CreateTask from './CreateTask';
import Tasks from './Tasks';

export default function ToDoList() {
  const [tasks, setTasks] = React.useState([]);

  // load tasks from local storage when the component mounts
  React.useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const handleTaskCreated = (newTask) => {
    // add the new task to the list
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTaskDeleted = (taskId) => {
    // remove the task from the list
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleTaskCompleted = (updatedTask) => {
    // update the task in the list
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  return (
    <div>
      <CreateTask onCreated={handleTaskCreated} />
      <Tasks tasks={tasks} onDeleted={handleTaskDeleted} onCompleted={handleTaskCompleted} />
    </div>
  );
}
