import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAdmin = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isAdmin') === 'true';
  return isLoggedIn ? children : <Navigate to="/admin/login" />;
};

export default RequireAdmin;