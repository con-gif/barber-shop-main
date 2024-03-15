import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthToken } from '../../utils/auth';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get('http://localhost:5000/api/bookings/admin', {
          headers: { Authorization: token },
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching admin bookings:', error);
        setError('Failed to fetch admin bookings.');
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Admin Bookings</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <p>Barbershop: {booking.barbershop}</p>
              <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p>Time: {booking.time}</p>
              <p>Service: {booking.service}</p>
              <p>Professional: {booking.professional}</p>
              <p>Status: {booking.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminBookings;