import React, { useReducer } from 'react';

export default function UseReducerHook() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'increment':
          return { count: state.count + 1 };
        case 'decrement':
          return { count: state.count - 1 };
        case 'multiply':
          return { count: state.count * 2 };
        case 'divide':
          return { count: state.count / 2 };
        case 'reset':
          return { count: 0 };
        default:
          return state;
      }
    },
    { count: 0 },
  );
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
      <button onClick={() => dispatch({ type: 'multiply' })}>Multiply by 2</button>
      <button onClick={() => dispatch({ type: 'divide' })}>Divide by 2</button>
      <br />
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

function UseStateExample() {
  const [count, setCount] = React.useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    setCount(count - 1);
  };
  const handleMultiply = () => {
    setCount(count * 2);
  };
  const handleDivide = () => {
    setCount(count / 2);
  };
  const handleReset = () => {
    setCount(0);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleMultiply}>Multiply by 2</button>
      <button onClick={handleDivide}>Divide by 2</button>
      <br />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
