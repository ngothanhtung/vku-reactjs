import React, { useCallback } from 'react';

function Good() {
  const handleClick = useCallback(() => console.log('Good!'), []);
  return <button onClick={handleClick}>Click</button>;
}

function Bad() {
  return <button onClick={() => console.log('Bad!')}>Click</button>;
}

export default function CommonPitfalls() {
  return (
    <div>
      <h2>Good Example</h2>
      <Good />
      <h2>Bad Example</h2>
      <Bad />
    </div>
  );
}
