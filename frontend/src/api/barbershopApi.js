// src/api/barbershopApi.js

import axios from 'axios';
import { getAuthToken } from '../utils/auth'; // Adjust the import path to your `getAuthToken` function

const BASE_URL = 'http://localhost:5000/api/barbershops';

export const fetchBarbershops = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const fetchBarbershopDetails = async (barbershopId) => {
  const response = await axios.get(`${BASE_URL}/${barbershopId}`);
  return response.data;
};


export const deleteBarbershop = async (barbershopId) => {
  const token = getAuthToken();
  const response = await axios.delete(`${BASE_URL}/${barbershopId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
