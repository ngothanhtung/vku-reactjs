import React from 'react';

export default function PassingArguments() {
  const handleClick = (arg1, arg2) => {
    console.log(arg1, arg2);
  };

  return (
    <div>
      <button onClick={() => handleClick('Hello', 'World')}>Click Me</button>
    </div>
  );
}

function PassingArguments2() {
  // Function to handle button click with arguments using a curried function
  const handleClick2 = (arg1, arg2) => () => {
    console.log(arg1, arg2);
  };

  return (
    <div>
      <button onClick={handleClick2('Hi', 'Nam')}>Click Me</button>
    </div>
  );
}
