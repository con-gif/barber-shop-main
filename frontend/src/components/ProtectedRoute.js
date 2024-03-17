// src/components/ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ requiredStatus, children }) => {
  const userStatus = useSelector((state) => state.auth.userStatus);

  if (userStatus < requiredStatus) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;