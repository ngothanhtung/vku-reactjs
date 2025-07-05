import React, { useState } from 'react';

function KeyPressDisplay() {
  const [lastKey, setLastKey] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setLastKey(event.key);
  };

  return (
    <section className='section'>
      <input type='text' onKeyDown={handleKeyDown} placeholder='Press any key' />
      <p>Last key: {lastKey || 'none'}</p>
    </section>
  );
}

export default KeyPressDisplay;
