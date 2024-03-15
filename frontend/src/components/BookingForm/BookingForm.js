import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/BookingForm.css';
import { getAuthToken } from '../../utils/auth';

const BookingForm = ({ barbershopId, selectedServices, selectedProfessional, selectedTime, onBookingConfirmed }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("You must be logged in to make a booking.");
      return;
    }

    const bookingData = {
      barbershop: barbershopId,
      date: selectedDate,
      time: selectedTime,
      service: selectedServices.join(', '),
      professional: selectedProfessional,
    };

    const token = getAuthToken();
    if (!token) {
      console.error('No token found, please log in again');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/reservations', bookingData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      const reservationCode = response.data.reservationCode;
      console.log('Booking created successfully. Reservation Code:', reservationCode);
      onBookingConfirmed(reservationCode);
    } catch (error) {
      console.error('Error creating booking:', error.response ? error.response.data.error : error.message);
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
          <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="dd/MM/yyyy" minDate={new Date()} required />
        </div>
        <button type="submit" className="btn-book">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;