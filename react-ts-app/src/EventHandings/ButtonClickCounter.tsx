import  { useState } from 'react';

function ButtonClickCounter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className='section'>
      <button onClick={handleClick}>Click Me</button>
      <p>Clicked: {count} times</p>
    </div>
  );
}

export default ButtonClickCounter;