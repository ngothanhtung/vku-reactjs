import { createContext } from 'react';

import type { User } from './types';
const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: (user: User | null) => {},
});

export default AuthContext;
