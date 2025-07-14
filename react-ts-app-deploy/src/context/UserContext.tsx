import React, { createContext, useState } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  age?: number | null;
}

interface UserContextType {
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: Omit<User, 'id'>) => {
    setUsers((prev) => [...prev, { ...user, id: crypto.randomUUID() }]);
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
};
