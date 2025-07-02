import React from 'react';
import styles from './ToDoList.module.css';
export default function Task({ task, onDeleted, onCompleted }) {
  const [isCompleted, setIsCompleted] = React.useState(task.completed);

  const handleDelete = (taskId) => {
    // confirm deletion
    if (window.confirm('Are you sure you want to delete this task?')) {
      // Remove the task from local storage
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const updatedTasks = storedTasks.filter((t) => t.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      // Optionally, you can also update the state in the parent component if needed
      onDeleted(taskId);
    }
  };

  const handleComplete = () => {
    // Toggle the completed status of the task
    const updatedTask = { ...task, completed: !task.completed };
    // Update the task in local storage
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = storedTasks.map((t) => (t.id === task.id ? updatedTask : t));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    // Update the local state
    setIsCompleted(updatedTask.completed);
    // Call the onCompleted callback to update the state in the parent component
    onCompleted(updatedTask);
  };

  return (
    <div className={styles.taskRow}>
      <div>
        <h4 style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>{task.title}</h4>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input type='checkbox' checked={isCompleted} onChange={handleComplete} />
        <div style={{ width: 10 }}></div>
        <button onClick={() => handleDelete(task.id)} style={{ backgroundColor: 'red', color: 'white' }}>
          Delete
        </button>
      </div>
    </div>
  );
}
