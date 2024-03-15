// src/api/barbershopApi.js

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/barbershops';

export const fetchBarbershops = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const fetchBarbershopDetails = async (barbershopId) => {
  const response = await axios.get(`${BASE_URL}/${barbershopId}`);
  return response.data;
};