import React from 'react';

export default function SyntheticEvents() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted!');
  };
  return (
    <form onSubmit={handleSubmit}>
      <button>Submit</button>
    </form>
  );
}
