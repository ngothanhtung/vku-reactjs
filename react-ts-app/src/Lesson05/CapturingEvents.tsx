import React from 'react';

export default function CapturingEvents() {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked', event);
  };

  const handleDivClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log('Div clicked', event);
  };

  return (
    <div onClickCapture={handleDivClick}>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
