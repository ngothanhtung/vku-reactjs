import React, { useState } from 'react';

export default function PropDrilling() {
  const [theme, setTheme] = useState('light');
  return <Middle theme={theme} />;
}

function Middle({ theme }) {
  return <Child theme={theme} />;
}

function Child({ theme }) {
  return <div>{theme}</div>;
}
