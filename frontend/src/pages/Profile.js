import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthToken } from '../utils/auth';

const Profile = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get('http://localhost:5000/api/reservations/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Error fetching bookings. Please try again later.');
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      {error && <p className="text-danger">{error}</p>}
      {!error && (
        <>
          <h3>Bookings</h3>
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <ul className="list-group">
              {bookings.map((booking) => (
                <li key={booking._id} className="list-group-item">
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
        </>
      )}
    </div>
  );
};

export default Profile;