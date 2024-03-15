import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
    userStatus: parseInt(localStorage.getItem('userStatus')) || 1, // Default to 1 if not found
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userStatus = action.payload.userStatus;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userStatus', action.payload.userStatus);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.userStatus = 1;
      localStorage.removeItem('token');
      localStorage.removeItem('userStatus');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;