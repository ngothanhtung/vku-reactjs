import { useState } from 'react';

export default function BatchingStateUpdates() {
  const [count, setCount] = useState(0);
  const increment = () => {
    // setCount(count + 1);
    // setCount(count + 1); // Only increments once

    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };
  return (
    <div>
      <h4>Batching State Updates Example</h4>
      <button onClick={increment}>{count}</button>
    </div>
  );
}
