import React, { useState } from 'react';

type Props = {};

export default function StateExample({}: Props) {
  const [count, setCount] = useState<number>(1);
  const [displayHelpPanel, setDisplayHelpPanel] = useState<boolean>(false);

  // lazy state initialization
  const [data, setData] = useState(() => {
    return Array(1000).fill('data');
  });

  const [student, setStudent] = useState({
    name: 'John Doe',
    age: 20,
    isActive: true,
  });

  const [todos, setTodos] = useState<string[]>([]);

  const handleDecrease = () => {
    setCount((prev) => prev - 1);
    setCount((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  const handleOnMouseEnter = () => {
    setDisplayHelpPanel(true);
  };

  const handleOnMouseLeave = () => {
    setDisplayHelpPanel(false);
  };

  const handleIncreaseAge = () => {
    setStudent((prev) => ({
      ...prev,
      age: prev.age + 1,
    }));
  };

  const handleCreateTask = () => {
    const task = 'Làm bài tập về nhà';
    // Good
    setTodos((prev) => [...prev, task]);

    // Bad - this will not work as expected
    // todos.push(task);
    // setTodos(todos);
  };

  console.log('Rendering with count:', count);
  return (
    <div>
      <button onClick={handleDecrease}>Decrease</button>
      <strong id='count'>{count}</strong>
      <button onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} onClick={handleIncrease}>
        Increase
      </button>

      <h3>Student Info</h3>
      <p>Name: {student.name}</p>
      <p>Age: {student.age}</p>
      <p>Status: {student.isActive ? 'Active' : 'Inactive'}</p>

      <button onClick={handleIncreaseAge}>Increase Age of student</button>

      <h3>Todos</h3>
      <button onClick={handleCreateTask}>Create task</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>

      <div style={{ display: displayHelpPanel ? 'block' : 'none', position: 'absolute', bottom: 10, right: 10, border: '1px solid black', padding: 10, borderRadius: 8 }}>
        <p>Help information about ...</p>
      </div>
    </div>
  );
}
