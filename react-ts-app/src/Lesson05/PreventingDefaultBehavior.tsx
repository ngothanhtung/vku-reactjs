import React from 'react';

export default function PreventingDefaultBehavior() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // logic to handle form submission
    // e.g., sending data to an API or updating state
    // For demonstration, we'll just log to the console
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type='submit'>Submit</button>
    </form>
  );
}
