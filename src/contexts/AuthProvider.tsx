import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);

  const login = (email: string, password: string) => {
    setUserId(1);
  };

  return (
    <AuthContext.Provider value={{ userId, setUserId, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
