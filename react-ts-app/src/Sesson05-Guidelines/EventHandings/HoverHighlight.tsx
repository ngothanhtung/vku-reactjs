import React, { useState } from 'react';

function HoverHighlight() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section className='section'>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundColor: isHovered ? 'yellow' : 'white',
          padding: '20px',
        }}
      >
        Hover me!
      </div>
    </section>
  );
}

export default HoverHighlight;
