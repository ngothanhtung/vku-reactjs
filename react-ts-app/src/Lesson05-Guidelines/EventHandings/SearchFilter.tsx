import React, { useState } from 'react';

function SearchFilter() {
  const items = ['Apple', 'Banana', 'Orange', 'Grapes', 'Pineapple'];
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='section'>
      <input type='text' value={searchTerm} onChange={handleSearchChange} placeholder='Enter search term' />
      <ul>{filteredItems.length > 0 ? filteredItems.map((item, index) => <li key={index}>{item}</li>) : <li>No items match your search</li>}</ul>
    </div>
  );
}

export default SearchFilter;
