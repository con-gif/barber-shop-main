// DeveloperUsers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../utils/auth';

const DeveloperUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get('http://localhost:5000/api/developer/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users.');
    }
  };

  const handleBanUser = async (userId) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(`http://localhost:5000/api/developer/users/${userId}/ban`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        // Successfully banned the user
        fetchUsers(); // Refresh the user list after banning
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError('Unauthorized: You do not have permission to ban users.');
      } else {
        console.error('Error banning user:', error);
        setError('Failed to ban user.');
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = getAuthToken();
      await axios.delete(`http://localhost:5000/api/developer/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers(); // Refresh the user list after deleting
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user.');
    }
  };

  const handleChangeStatus = async (userId, newStatus) => {
    try {
      const token = getAuthToken();
      await axios.put(`http://localhost:5000/api/developer/users/${userId}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers(); // Refresh the user list after changing status
    } catch (error) {
      console.error('Error changing user status:', error);
      setError('Failed to change user status.');
    }
  };

  const handleUnbanUser = async (userId) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(`http://localhost:5000/api/developer/users/${userId}/unban`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        // Successfully unbanned the user
        fetchUsers(); // Refresh the user list after unbanning
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError('Unauthorized: You do not have permission to unban users.');
      } else {
        console.error('Error unbanning user:', error);
        setError('Failed to unban user.');
      }
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            Username: {user.username} - Status: {user.status}
            <button onClick={() => handleBanUser(user._id)}>Ban</button>
            <button onClick={() => handleUnbanUser(user._id)}>Unban</button>
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
            <select
              value={user.status}
              onChange={(e) => handleChangeStatus(user._id, parseInt(e.target.value))}
            >
              <option value={1}>Normal User</option>
              <option value={2}>Admin</option>
              <option value={3}>Developer</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeveloperUsers;