import React from 'react';

export default function HandlingKeyboardEvents() {
  const handleKeyDown = (e) => {
    console.log(`Key pressed: ${e.key}`);
    if (e.key === 'Enter') {
      console.log('Enter pressed!');
    }
  };
  return <input onKeyDown={handleKeyDown} />;
}
