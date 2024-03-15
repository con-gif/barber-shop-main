// src/pages/BarberShopList.js

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setBarbershops } from '../features/barbershop/barbershopSlice';
import { fetchBarbershops } from '../api/barbershopApi';

const BarberShopList = () => {
  const { barbershops } = useSelector((state) => state.barbershop);
  const dispatch = useDispatch();

  useEffect(() => {
    const getBarbershops = async () => {
      try {
        const barbershopList = await fetchBarbershops();
        dispatch(setBarbershops(barbershopList));
      } catch (error) {
        console.error('Error fetching barbershops:', error);
      }
    };

    getBarbershops();
  }, [dispatch]);

  return (
    <div>
      <h2>Barbershops</h2>
      <ul>
        {barbershops.map((barbershop) => (
          <li key={barbershop._id}>
            <Link to={`/barbershops/${barbershop._id}`}>{barbershop.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BarberShopList;