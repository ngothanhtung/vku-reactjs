import React from 'react';
import Block01 from './Block01';

export default function Blocks({ items = [] }) {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: '10px' }}>
          <Block01 name={item.name} percent={item.percent} primaryColor={item.primaryColor} secondaryColor={item.secondaryColor} />
        </div>
      ))}
    </div>
  );
}
