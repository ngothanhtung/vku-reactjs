import React from 'react';

export default function HandlingKeyboardEvents() {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(`Key pressed: ${event.key}`);
    if (event.key === 'Enter') {
      console.log('Enter pressed!');
    }
  };
  return <input onKeyDown={handleKeyDown} />;
}
