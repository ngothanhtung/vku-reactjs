import React, { useState } from 'react';

export default function LiftingStateUp() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);

  return (
    <div>
      <h1>Counter App</h1>
      <Label text={count} />
      <Counter count={count} onIncrement={handleIncrement} onDecrement={handleDecrement} />
    </div>
  );
}

// Counter component
const Counter = ({ count, onIncrement, onDecrement }) => {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>
  );
};

const Label = ({ text }) => {
  return <h2>{text}</h2>;
};
