import React from 'react';

export default function CapturingEvents() {
  const handleClick = (event) => {
    console.log('Button clicked');
  };

  const handleDivClick = () => {
    console.log('Div clicked');
  };

  return (
    <div onClickCapture={handleDivClick}>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
