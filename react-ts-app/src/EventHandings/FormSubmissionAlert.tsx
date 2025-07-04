import React, { useState } from 'react';

function FormSubmissionAlert() {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`You submitted: ${inputValue}`);
    setInputValue('');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <section className="section">
        <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter text"
      />
      <button type="submit">Submit</button>
    </form>
    </section>
  );
}

export default FormSubmissionAlert;