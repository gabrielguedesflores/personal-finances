import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
