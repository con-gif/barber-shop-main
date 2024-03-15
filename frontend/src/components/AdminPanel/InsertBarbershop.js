import React, { useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../utils/auth';
import { getAuthUsername } from '../../utils/auth';


const InsertBarbershop = () => {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [professionals, setProfessionals] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const barbershopData = {
        name,
        street,
        professionals: professionals.split(',').map((professional) => professional.trim()),
        adminUsername: getAuthUsername(), 
      };
      const token = getAuthToken();

      await axios.post('http://localhost:5000/api/barbershops', barbershopData, {
        headers: {
          Authorization: token,
        },
      });
      console.log('Barbershop inserted successfully');
      // Reset form fields
      setName('');
      setStreet('');
      setProfessionals('');
    } catch (error) {
      console.error('Error inserting barbershop:', error.response.data);
      setError('Access denied. You do not have permission to perform this action.');
    }
  };

  return (
    <div>
      <h2>Insert Barbershop</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Street:
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </label>
        <label>
          Professionals (comma-separated):
          <input
            type="text"
            value={professionals}
            onChange={(e) => setProfessionals(e.target.value)}
          />
        </label>
        <button type="submit">Insert Barbershop</button>
      </form>
    </div>
  );
};

export default InsertBarbershop;