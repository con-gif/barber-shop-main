import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BarberShopList = () => {
  const [barbershops, setBarbershops] = useState([]);

  useEffect(() => {
    const fetchBarbershops = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/barbershops');
        setBarbershops(response.data);
      } catch (error) {
        console.error('Error fetching barbershops:', error);
      }
    };

    fetchBarbershops();
  }, []);

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