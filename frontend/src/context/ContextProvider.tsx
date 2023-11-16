// ContextProvider.tsx
import React, { useState, createContext, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Apartement, Application } from '../typescriptHelpers/apartements'
import { Users } from '../typescriptHelpers/users'


interface AuthContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  application: Application | null;
  user?: Users | null;
  setApplication: React.Dispatch<React.SetStateAction<Application | null>>;
  setUser: React.Dispatch<React.SetStateAction<Users | null>>;
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
    // Initialize token from localStorage or default to null
    return localStorage.getItem('token') || null;
  });

  const [application, setApplication] = useState<Application | null>(null);
  const [user, setUser] = useState<Users | null>(null); // Define user with useState here at the top level

  useEffect(() => {
    // Use useEffect to update localStorage whenever the token changes
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const fetchApplication = useCallback((id: string) => {
    // Now you should not use useState here. This block is only for fetching.
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
          setApplication(data.application); // Assuming data.application is the application data
          console.log(data.application); // Logging the application data
          // Presumably, you want to set user data here as well
          if (data.application && data.application.user) {
            setUser(data.application.user); // Set user data
          }
        })
        .catch(error => {
          console.error('Error fetching application:', error);
        });
    }
  }, [token]); // You might want to add setUser to your dependency array if you use it inside the callback

  // Passing down fetchApplication, application, and user through context
  return (
    <AuthContext.Provider value={{ user, token, setToken, application, setApplication, fetchApplication, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default ContextProvider;
