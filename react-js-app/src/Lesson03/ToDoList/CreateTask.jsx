import React from 'react';

export default function CreateTask({ onCreated }) {
  const [text, setText] = React.useState('');

  const handleCreate = () => {
    const newTask = {
      id: Date.now(),
      title: text,
      completed: false,
    };

    // Save to local storage
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    localStorage.setItem('tasks', JSON.stringify([...storedTasks, newTask]));
    onCreated(newTask);
    setText(''); // Clear the input field after creating a task
  };
  return (
    <div>
      <input type='text' value={text} onChange={(e) => setText(e.target.value)} placeholder='New task title' />
      <button onClick={handleCreate}>Add Task</button>
    </div>
  );
}
