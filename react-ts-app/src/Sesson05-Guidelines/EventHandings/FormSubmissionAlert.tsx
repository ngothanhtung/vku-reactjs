import React, { useState } from 'react';

function FormSubmissionAlert() {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`You submitted: ${inputValue}`);
    setInputValue('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <section className='section'>
      <form onSubmit={handleSubmit}>
        <input type='text' value={inputValue} onChange={handleInputChange} placeholder='Enter text' />
        <button type='submit'>Submit</button>
      </form>
    </section>
  );
}

export default FormSubmissionAlert;
