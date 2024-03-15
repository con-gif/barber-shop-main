import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authslice';
import './Registration.css';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, password });
      console.log(response.data.message);

      // Automatically log in the user
      const loginResponse = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const token = loginResponse.data.token;
      const userStatus = loginResponse.data.userStatus;
      dispatch(login({ token, userStatus }));
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error.response.data.error);
    }
  };

  return (
    <div
      className="registration-container"
      style={{ backgroundImage: 'url(/mot.jpg)' }} // Set the background image inline
    >
      <div className="registration-card">
        <h2 className="registration-title">Create an Account</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-register">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;