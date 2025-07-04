import React, { useState } from 'react';

function DropdownSelection() {
  const [selectedFruit, setSelectedFruit] = useState('Apple');

  const handleSelectChange = (event) => {
    setSelectedFruit(event.target.value);
  };

  return (
    <div className='section'>
      <select value={selectedFruit} onChange={handleSelectChange}>
        <option value="Apple">Apple</option>
        <option value="Banana">Banana</option>
        <option value="Orange">Orange</option>
      </select>
      <p>Selected fruit: {selectedFruit}</p>
    </div>
  );
}

export default DropdownSelection;