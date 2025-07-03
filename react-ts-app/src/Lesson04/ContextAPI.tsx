import React, { createContext, useContext, useState } from 'react';
const ThemeContext = createContext();

export default function ContextAPI() {
  const [theme, setTheme] = useState('light');
  return (
    <div>
      <h5>Context API Example</h5>
      <ThemeContext.Provider value={theme}>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
        <Child />
      </ThemeContext.Provider>
    </div>
  );
}

function Child() {
  const theme = useContext(ThemeContext);
  return <div>{theme}</div>;
}
