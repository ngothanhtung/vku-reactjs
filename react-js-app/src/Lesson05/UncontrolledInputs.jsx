import React, { useRef } from 'react';

export default function UncontrolledInputs() {
  const inputEmailRef = useRef(null);
  const inputNameRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Input value:', inputEmailRef.current.value);
    console.log('Input value:', inputNameRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Email' ref={inputEmailRef} />
      <input type='text' placeholder='Name' ref={inputNameRef} />
      <button type='submit'>Submit</button>
    </form>
  );
}
