import React, { useState } from 'react';
import axios from 'axios';
import { IAuthContextTypeDTO } from '../interfaces/AuthContextType.dto';
import { IUserTypeDTO } from '../dto/UserType.dto';

export const AuthContext = React.createContext<IAuthContextTypeDTO>({} as IAuthContextTypeDTO);

const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<IAuthContextTypeDTO['user']>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/v1/login', {
        userEmail: email,
        userPassword: password,
      });

      if (response.status === 200 && response.data.status === 'SUCCESS') {
        const userData: IUserTypeDTO = response.data.user;
        setUser(userData);
        return userData;
      } else {
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error('Error during login:', error);
      setUser(null);
      return false;
    }
  };

  const authContextValue = {
    user,
    setUser,
    login,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
