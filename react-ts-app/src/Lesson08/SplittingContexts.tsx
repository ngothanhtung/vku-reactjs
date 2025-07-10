import { useState, createContext, useContext } from 'react';

const ThemeContext = createContext('light');
const UserContext = createContext('Guest');

export default function SplittingContexts() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState('Guest');
  return (
    <ThemeContext.Provider value={theme}>
      <UserContext.Provider value={user}>
        <Component />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

function Component() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);

  return (
    <div>
      <p>Current Theme: {theme}</p>
      <p>Current User: {user}</p>
    </div>
  );
}
