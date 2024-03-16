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
        const response = await axios.get('http://localhost:5000/api/reservations', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching admin bookings:', error);
        setError('Failed to fetch admin bookings.');
      }
    };

    fetchBookings();
  }, []);

  const handleConfirmBooking = async (bookingId) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(
        `http://localhost:5000/api/reservations/${bookingId}/confirm`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        // Update the bookings state after confirming
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId ? { ...booking, status: 'confirmed' } : booking
          )
        );
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
      setError(`Error confirming booking: ${error.response ? error.response.data.error : error.message}`);
    }
  };

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
              <p>Barbershop: {booking.barbershop.name}</p>
              <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p>Time: {booking.time}</p>
              <p>Service: {booking.service}</p>
              <p>Professional: {booking.professional}</p>
              <p>Status: {booking.status}</p>
              {booking.status === 'pending' && (
                <button onClick={() => handleConfirmBooking(booking._id)}>Confirm</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminBookings;
