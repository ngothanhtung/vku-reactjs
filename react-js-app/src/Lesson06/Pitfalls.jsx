import React, { useState, useEffect } from 'react';

export default function Pitfalls() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1); // Infinite loop
  }, [count]);

  return <div>{count}</div>;
}
