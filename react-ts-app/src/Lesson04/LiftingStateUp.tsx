import React, { useState } from 'react';

export default function LiftingStateUp() {
  const [count, setCount] = useState(0);

  const onIncrement = () => setCount(count + 1);
  const onDecrement = () => setCount(count - 1);

  return (
    <div>
      <h1>Counter App</h1>
      <Label text={count} />
      <Counter count={count} onIncrement={onIncrement} onDecrement={onDecrement} />
    </div>
  );
}

// Counter component

type CounterProps = {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const Counter = ({ count, onIncrement, onDecrement }: CounterProps) => {
  return (
    <div>
      <h4>{count}</h4>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>
  );
};

type LabelProps = {
  text: string | number;
};
const Label = ({ text }: LabelProps) => {
  return <h1>Label:{text}</h1>;
};
