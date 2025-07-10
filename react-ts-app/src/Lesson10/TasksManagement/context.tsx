// Create LoginContext to manage login state
import { createContext } from 'react';

export const LoginContext = createContext({ user: null, setUser: (user: any) => {} });
