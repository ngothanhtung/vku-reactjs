import React from 'react';

export default function HandlingMouseEvents() {
  const handleMouseEnter = () => {
    console.log('Mouse entered');
  };

  const handleMouseLeave = () => {
    console.log('Mouse left');
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      Hover over this div
    </div>
  );
}
