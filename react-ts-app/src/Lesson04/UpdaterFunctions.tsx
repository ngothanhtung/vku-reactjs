import { useState } from 'react';

export default function UpdaterFunctions() {
  const [count, setCount] = useState(0);
  const increment = () => setCount((prev) => prev + 1);
  return <button onClick={increment}>{count}</button>;
}
