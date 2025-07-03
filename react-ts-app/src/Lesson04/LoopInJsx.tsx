import React from 'react';

const array = [
  {
    id: 1,
    name: 'iPhone 14',
    price: 1000,
  },
  {
    id: 2,
    name: 'iPhone 14 Pro',
    price: 1200,
  },
  {
    id: 3,
    name: 'iPhone 14 Pro Max',
    price: 1500,
  },
];

export default function LoopInJsx() {
  return (
    <div>
      {array.map((item) => {
        return (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.price}</p>
          </div>
        );
      })}
    </div>
  );
}
