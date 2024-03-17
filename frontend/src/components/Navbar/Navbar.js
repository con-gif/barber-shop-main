// src/components/Navbar/Navbar.js
import React, { useEffect } from 'react'; // Add useEffect here
import * as THREE from 'three';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authslice';
import '../../styles/Navbar.css';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userStatus = useSelector((state) => state.auth.userStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };



  return (
    <nav className="navbar navbar-expand-lg navbar-transparent">
      <div className="container">
        <Link className="navbar-brand" to="/">Barbershop around your corner</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/barbershops">Barbershops</Link>
            </li>
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                {userStatus >= 2 && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin Menu</Link>
                  </li>
                )}
                {userStatus === 3 && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/developer-panel">Developer Panel</Link>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;