import { useState } from 'react';

function InputFieldTracker() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className='section'>
      <input type='text' value={inputValue} onChange={handleInputChange} placeholder='Type something' />
      <p>You typed: {inputValue || 'nothing'}</p>
    </div>
  );
}

export default InputFieldTracker;
