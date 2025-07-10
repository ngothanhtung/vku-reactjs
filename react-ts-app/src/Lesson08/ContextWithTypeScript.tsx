import { createContext } from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ContextWithTypeScript() {
  return (
    <ThemeContext.Provider value={{ theme: 'light', setTheme: () => {} }}>
      <div>ContextWithTypeScript</div>
    </ThemeContext.Provider>
  );
}
