import React, { useState } from 'react';

export default function HandlingFormSubmission() {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button type='submit'>Submit</button>
    </form>
  );
}
