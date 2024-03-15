import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingForm.css';

const BookingForm = ({ barbershopId, selectedServices, selectedProfessional, username, selectedTime, onBookingConfirmed }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("You must be logged in to make a booking.");
      return;
    }

    try {
      const bookingData = {
        barbershop: barbershopId,
        username: username,
        date: selectedDate,
        time: selectedTime,
        service: selectedServices.join(', '),
        professional: selectedProfessional,
      };
      console.log('Booking data:', bookingData);

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
    <div className="booking-form">
      <h3>Book Appointment</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            required
          />
        </div>
        <button type="submit" className="btn-book">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;