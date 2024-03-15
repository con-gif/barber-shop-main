// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authslice';
import barbershopReducer from './features/barbershop/barbershopSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    barbershop: barbershopReducer,
    // Add other reducers if needed
  },
});

export default store;