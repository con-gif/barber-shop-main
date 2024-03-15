import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/auth/authslice';
import '../../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const token = response.data.token;
      const userStatus = response.data.userStatus;
      dispatch(login({ token, userStatus }));
      console.log('Login successful');
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.response.data.error);
      setError('Incorrect username or password. Please try again.');
    }
  };

  const handleInputChange = () => {
    setError('');
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">Login</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="image-placeholder mb-3"></div>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  handleInputChange();
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleInputChange();
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;