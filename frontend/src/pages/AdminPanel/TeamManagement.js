import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../utils/auth';

const TeamManagement = () => {
  const [team, setTeam] = useState([]);
  const [newProfessional, setNewProfessional] = useState('');
  const [error, setError] = useState('');

// Example of fetching team data in TeamManagement component
useEffect(() => {
  const fetchTeam = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/barbershops/my-barbershop/professionals', {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      setTeam(response.data.professionals);
    } catch (error) {
      console.error('Error fetching team data:', error);
      setError('Failed to fetch team data.');
    }
  };
  fetchTeam();
}, []);


  const handleAddProfessional = async () => {
    try {
      const token = getAuthToken();
      await axios.post('http://localhost:5000/api/barbershops/my-barbershop/add-professional', {
        professionalName: newProfessional,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Optimistic UI update
      setTeam(prev => [...prev, newProfessional]);
      setNewProfessional('');
    } catch (err) {
      // Improved error logging
      console.error('Error adding professional:', err.response ? err.response.data : err.message);
      setError('Failed to add professional. Please check console for more details.');
    }
  };

  return (
    <div>
      <h2>Team Management</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        value={newProfessional}
        onChange={(e) => setNewProfessional(e.target.value)}
        placeholder="Professional's name"
      />
      <button onClick={handleAddProfessional}>Add Professional</button>
      <ul>
        {team.map((professional, index) => (
          <li key={index}>{professional}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamManagement;
