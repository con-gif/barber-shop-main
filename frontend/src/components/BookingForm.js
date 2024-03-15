import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import useSelector

const BookingForm = ({ barbershopId, selectedServices, selectedProfessional, username, selectedTime, onBookingConfirmed }) => {
    const [date, setDate] = useState('');
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn); // Access isLoggedIn state

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            alert("You must be logged in to make a booking.");
            return; // Prevent the form submission if not logged in
        }

        try {
            const bookingData = {
              barbershop: barbershopId,
              username: username, // Use the username prop passed from TimeSelection
              date: new Date(date),
              time: selectedTime,
              service: selectedServices.join(', '),
              professional: selectedProfessional,
            };
            console.log('Booking data:', bookingData);

            // Include Authorization header with the token when making the booking
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/bookings', bookingData, {
                headers: {
                    Authorization: token,
                },
            });
            const reservationCode = response.data.reservationCode;
            console.log('Booking created successfully. Reservation Code:', reservationCode);
            onBookingConfirmed(reservationCode);
        } catch (error) {
            console.error('Error creating booking:', error.response ? error.response.data : error);
        }
    };

    if (!isLoggedIn) {
        return <p>You need to be logged in to book an appointment.</p>;
    }

    return (
        <div>
          <h3>Book Appointment</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Date:
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </label>
            <button type="submit">Book Now</button>
          </form>
        </div>
    );
};

export default BookingForm;
