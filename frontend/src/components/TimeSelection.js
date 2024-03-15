import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm/BookingForm';
import '../styles/TimeSelection.css';

const TimeSelection = () => {
  const { id } = useParams();
  const location = useLocation();
  const selectedServices = location.state?.selectedServices || [];
  const selectedProfessional = location.state?.selectedProfessional || null;
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();

  const generateTimeSlots = () => {
    const timeSlots = [];
    const startHour = 8;
    const endHour = 20;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        timeSlots.push(time);
      }
    }

    return timeSlots;
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const handleBookingConfirmed = (reservationCode) => {
    navigate(`/barbershops/${id}/confirmation`, { state: { reservationCode } });
  };

  return (
    <div className="time-selection">
      <h2>Select a Time</h2>
      <ul className="time-slots">
        {generateTimeSlots().map((time) => (
          <li key={time}>
            <label>
              <input
                type="radio"
                name="time-slot"
                checked={selectedTime === time}
                onChange={() => handleTimeSelection(time)}
              />
              {time}
            </label>
          </li>
        ))}
      </ul>
      {selectedTime && (
        <BookingForm
          barbershopId={id}
          selectedServices={selectedServices}
          selectedProfessional={selectedProfessional}
          selectedTime={selectedTime}
          onBookingConfirmed={handleBookingConfirmed}
        />
      )}
    </div>
  );
};

export default TimeSelection;
