import { useState } from 'react';

export default function PropDrilling() {
  const [theme, setTheme] = useState('light');
  return (
    <div>
      <Middle theme={theme} />

      <button
        onClick={() => {
          setTheme(theme === 'light' ? 'dark' : 'light');
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}

type MiddleProps = { theme: string };
function Middle({ theme }: MiddleProps) {
  return <Child theme={theme} />;
}

function Child({ theme }: MiddleProps) {
  return <div>{theme}</div>;
}
