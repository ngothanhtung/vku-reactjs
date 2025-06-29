import { useState } from 'react';

export default function BatchingStateUpdates() {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
    setCount(count + 1); // Only increments once

    // setCount((prevCount) => prevCount + 1);
    // setCount((prevCount) => prevCount + 1);
  };
  return (
    <div>
      <h4>Batching State Updates Example</h4>
      <button onClick={increment}>{count}</button>
    </div>
  );
}
