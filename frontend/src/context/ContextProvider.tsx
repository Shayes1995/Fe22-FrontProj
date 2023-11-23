import React, { useState, createContext, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Apartement, Application } from '../typescriptHelpers/apartements'
import { Users, LoggedInUser } from '../typescriptHelpers/users'


interface AuthContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  application: Application | null;
  user: Users | null;
  userInfo: LoggedInUser | null;
  setApplication: React.Dispatch<React.SetStateAction<Application | null>>;
  setUser: React.Dispatch<React.SetStateAction<Users | null>>;
  setUserInfo: React.Dispatch<React.SetStateAction<LoggedInUser | null>>;
  fetchApplication: (id: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a ContextProvider");
  }
  return context;
}

interface ContextProviderProps {
  children: ReactNode;
}


const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {

    return localStorage.getItem('token') || null;
  });

  const [application, setApplication] = useState<Application | null>(null);
  const [user, setUser] = useState<Users | null>(null); 
  const [userInfo, setUserInfo] = useState<LoggedInUser | null>(() => {
    const storedUserInfo = localStorage.getItem('user');
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });




  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const fetchApplication = useCallback((id: string) => {
    if (token) {
      fetch(`http://localhost:9998/api/application/all-applications/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch the application.');
          }
          return response.json();
        })
        .then(data => {
          setApplication(data.application);
          console.log(data.application); // logging the application data
          if (data.application && data.application.user) {
            setUser(data.application.user); // setting user data
          }
        })
        .catch(error => {
          console.error('Error fetching application:', error);
        });
    }
  }, [token, setUser, setUserInfo]);

  return (
    <AuthContext.Provider value={{ user, setUser, userInfo, setUserInfo, token, setToken, application, setApplication, fetchApplication }}>
      {children}
    </AuthContext.Provider>

  );
}

export default ContextProvider;
