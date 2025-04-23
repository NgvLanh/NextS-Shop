'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import { UserType } from '../lib/types';

interface UserContextType {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>({} as UserType);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
