// Assuming this is frontend/src/pages/DeveloperPanel/DeveloperUsers.js based on the structure you're aiming for
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../utils/auth';

const DeveloperUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
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

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Manage Users</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default DeveloperUsers;
