import axios from 'axios';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const setAuthUsername = (username) => {
  localStorage.setItem('username', username);
};

export const getAuthUsername = () => {
  return localStorage.getItem('username');
};