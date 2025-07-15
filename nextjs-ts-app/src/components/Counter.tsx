'use client';
import React from 'react';

export default function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <strong className='text-2xl'>Count: {count}</strong>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
