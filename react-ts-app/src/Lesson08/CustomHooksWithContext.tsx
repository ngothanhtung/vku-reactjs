import { ThemeContext } from '@emotion/react/macro';
import React, { useContext } from 'react';

type Props = {};

function Component() {
  const { theme, setTheme } = useTheme();
  return <p>Theme: {theme}</p>;
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

export default function CustomHooksWithContext({}: Props) {
  return <div>CustomHooksWithContext</div>;
}
