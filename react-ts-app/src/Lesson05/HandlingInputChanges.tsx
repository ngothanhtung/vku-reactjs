import React from 'react';

export default function HandlingInputChanges() {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  return (
    <div>
      <input type='text' onChange={handleChange} />
    </div>
  );
}
