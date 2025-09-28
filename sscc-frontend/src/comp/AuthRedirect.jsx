// comp/AuthRedirect.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRedirect = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export default AuthRedirect;
