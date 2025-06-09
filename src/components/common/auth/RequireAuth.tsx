import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';

export const RequireAuth = ({ children }: { children: React.ReactElement }) => {
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
