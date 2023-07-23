import { createContext } from 'react';

type AuthContextType = {
  userId: number | null;
  setUserId: (userId: number | null) => void;
};

const initialAuthContext: AuthContextType = {
  userId: null,
  setUserId: () => {},
};

export const AuthContext = createContext(initialAuthContext);
