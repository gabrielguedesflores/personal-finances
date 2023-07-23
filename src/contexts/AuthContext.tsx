import { createContext } from 'react';

type AuthContextType = {
  userId: number | null;
  setUserId: (userId: number | null) => void;
  login: (email: string, password: string) => void;
};

const initialAuthContext: AuthContextType = {
  userId: 1,
  setUserId: () => {},
  login: () => {}, // We add the login function here with a dummy implementation
};

export const AuthContext = createContext(initialAuthContext);
