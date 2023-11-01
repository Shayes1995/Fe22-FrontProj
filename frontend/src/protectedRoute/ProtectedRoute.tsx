import React from 'react';
import { useAuth } from '../context/ContextProvider';
import { Navigate } from 'react-router-dom'; 

interface ProtectedRouteProps {
  children: React.ReactNode;
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}


export default ProtectedRoute;
