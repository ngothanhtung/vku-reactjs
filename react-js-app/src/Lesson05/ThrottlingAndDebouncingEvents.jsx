import React from 'react';

export default function ThrottlingAndDebouncingEvents() {
  const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };
  const handleSearch = debounce((value) => console.log(value), 500);
  return <input onChange={(e) => handleSearch(e.target.value)} />;
}
