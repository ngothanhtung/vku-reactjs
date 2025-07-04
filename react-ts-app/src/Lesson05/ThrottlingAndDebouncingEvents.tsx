import React from 'react';

export default function ThrottlingAndDebouncingEvents() {
  const debounce = (fn: (...args: any[]) => void, delay: number) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };

  const handleSearch = debounce((value: string) => console.log(value), 1000);

  return <input onChange={(e) => handleSearch(e.target.value)} />;
}
