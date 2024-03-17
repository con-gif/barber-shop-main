import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../utils/auth';
import { fetchBarbershops, deleteBarbershop } from '../../api/barbershopApi'; // Adjust the path as necessary

const DeveloperBarbershops = () => {
  const [barbershops, setBarbershops] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBarbershops();
  }, []);

  const fetchBarbershops = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get('http://localhost:5000/api/barbershops', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBarbershops(response.data);
    } catch (error) {
      console.error('Error fetching barbershops:', error);
      setError('Failed to fetch barbershops.');
    }
  };

  const handleDeleteBarbershop = async (barbershopId) => {
    try {
      await deleteBarbershop(barbershopId);
      setBarbershops(barbershops.filter((barbershop) => barbershop._id !== barbershopId)); // Update the state to remove the deleted barbershop
    } catch (error) {
      console.error('Error deleting barbershop:', error);
      setError('Failed to delete barbershop.'); // Update your state or UI based on error
    }
  };

  return (
    <div>
      <h2>Manage Barbershops</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
  {barbershops.map((barbershop) => (
    <li key={barbershop._id}>
      Name: {barbershop.name}
      <button onClick={() => handleDeleteBarbershop(barbershop._id)}>Delete</button>
    </li>
  ))}
</ul>
    </div>
  );
};

export default DeveloperBarbershops;
