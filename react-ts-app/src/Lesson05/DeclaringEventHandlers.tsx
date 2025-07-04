import React, { useState } from 'react';

export default function DeclaringEventHandlers() {
  const handleToggle = () => {
    console.log('Toggled!');
  };
  return <button onClick={handleToggle}>Toggle</button>;
}

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Add</button>;
}
