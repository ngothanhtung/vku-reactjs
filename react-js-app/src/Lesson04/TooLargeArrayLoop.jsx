import React from 'react';

// create an array with 1000 items
const array = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
  price: (index + 1) * 10,
}));

export default function TooLargeArrayLoop() {
  return (
    <div>
      {array.map((item) => (
        <div key={item.id}>
          <strong>{item.name}</strong>
          <div>{item.price}</div>
        </div>
      ))}
    </div>
  );
}
