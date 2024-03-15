// src/features/barbershop/barbershopSlice.js

import { createSlice } from '@reduxjs/toolkit';

const barbershopSlice = createSlice({
  name: 'barbershop',
  initialState: {
    barbershops: [],
    selectedBarbershop: null,
    selectedServices: [],
  },
  reducers: {
    setBarbershops: (state, action) => {
      state.barbershops = action.payload;
    },
    setSelectedBarbershop: (state, action) => {
      state.selectedBarbershop = action.payload;
    },
    setSelectedServices: (state, action) => {
      state.selectedServices = action.payload;
    },
  },
});

export const { setBarbershops, setSelectedBarbershop, setSelectedServices } = barbershopSlice.actions;

export default barbershopSlice.reducer;