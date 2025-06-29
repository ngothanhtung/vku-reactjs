import React from 'react';

export default function HandlingTouchEvents() {
  return <div onTouchStart={() => console.log('Touch started!')}>Swipe Me</div>;
}
