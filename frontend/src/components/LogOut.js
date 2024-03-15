import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authslice';

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatching the logout action to update the Redux state
    dispatch(logout());

    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Remove the username from localStorage
    localStorage.removeItem('username');

    // Navigate to the home page after logging out
    navigate('/', { replace: true });
  }, [navigate, dispatch]);

  // Since this component does not render anything, return null
  return null;
};

export default LogOut;