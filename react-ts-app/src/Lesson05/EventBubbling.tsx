import React from 'react';

export default function EventBubbling() {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked');
    event.stopPropagation();
  };

  const handleDivClick = () => {
    console.log('Div clicked');
  };

  return (
    <div onClick={handleDivClick}>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
